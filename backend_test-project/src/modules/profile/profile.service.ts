import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from 'src/models/users.model'
import type { Repository } from 'typeorm'
import type { DtoUpdate } from './dto/update.dto'

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Users) private usersRepository: Repository<Users>
	) {}

	async checkUser(id: number): Promise<Users> {
		const dataUser = await this.usersRepository.findOne({ where: { id } })
		if (!dataUser) {
			throw new HttpException(
				'Пользователя с таким id нет.',
				HttpStatus.NOT_FOUND
			)
		}
		return dataUser
	}

	async getInfo(id: number): Promise<{ Username: string; Email: string }> {
		const dataUser = await this.checkUser(id)

		return { Username: dataUser.username, Email: dataUser.email }
	}

	async updateInfo(dto: DtoUpdate, id: number): Promise<{ message: string }> {
		await this.checkUser(id)

		await this.usersRepository.update(id, dto)
		return { message: 'Данные успешно обновлены.' }
	}
}
