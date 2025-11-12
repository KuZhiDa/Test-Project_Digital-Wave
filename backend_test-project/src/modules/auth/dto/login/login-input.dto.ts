import { IsNotEmpty } from 'class-validator'

export class DtoLogin {
	@IsNotEmpty({ message: 'Поле login не заполнено.' })
	login: string

	@IsNotEmpty({ message: 'Поле password не заполнено' })
	password: string
}
