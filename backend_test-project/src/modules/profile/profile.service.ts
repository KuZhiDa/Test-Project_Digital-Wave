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

	async getInfo(id: number): Promise<{ username: string; email: string }> {
		const dataUser = await this.checkUser(id)
		return { username: dataUser.username, email: dataUser.email }
	}

	async updateInfo(
		dto: DtoUpdate,
		id: number
	): Promise<{ username: string; email: string }> {
		const user = await this.checkUser(id)
		Object.assign(user, dto)
		const updatedUser = await this.usersRepository.save(user)
		return { username: updatedUser.username, email: updatedUser.email }
	}
}
