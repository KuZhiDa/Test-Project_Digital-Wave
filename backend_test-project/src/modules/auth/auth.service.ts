import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from 'src/models/users.model'
import { Repository } from 'typeorm'
import { DtoRegister } from './dto/register.dto'
import { DtoLogin } from './dto/login/login-input.dto'
import * as bcrypt from 'bcrypt'
import { DtoReturnData } from './dto/login/login-output.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Users) private repositoryUsers: Repository<Users>,
		private jwt: JwtService
	) {}

	async register(dto: DtoRegister): Promise<{ message: string }> {
		const dataUser = await this.repositoryUsers.findOne({
			where: [
				{ login: dto.login },
				{ email: dto.email },
				{ username: dto.username },
			],
		})
		if (dataUser) {
			throw new HttpException(
				'Пользователь с такими данными уже существует.',
				HttpStatus.BAD_REQUEST
			)
		}

		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(dto.password, salt)

		dto.password = passwordHash

		await this.repositoryUsers.save(dto)

		return { message: 'Пользователь успешно создан' }
	}

	async login(dto: DtoLogin): Promise<DtoReturnData> {
		const dataUser = await this.repositoryUsers.findOne({
			where: [{ login: dto.login }],
			select: ['id', 'password'],
		})
		if (!dataUser) {
			throw new HttpException(
				'Неверный логин или пароль.',
				HttpStatus.BAD_REQUEST
			)
		}

		const acceptedPassword = await bcrypt.compare(
			dto.password,
			dataUser.password
		)
		if (!acceptedPassword) {
			throw new HttpException(
				'Неверный логин или пароль.',
				HttpStatus.BAD_REQUEST
			)
		}

		const token = await this.jwt.signAsync(
			{ id: dataUser.id },
			{ secret: process.env.SECRET, expiresIn: '24h' }
		)
		return {
			token,
			message: 'Пользователь успешно авторизован.',
		}
	}
	async logout() {}
}
