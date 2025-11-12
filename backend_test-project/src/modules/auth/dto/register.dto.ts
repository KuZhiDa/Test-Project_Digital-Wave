import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'

export class DtoRegister {
	@Length(1, 15, {
		message:
			'Поле username должно содержать не больше 15 символов  и не быть пустым.',
	})
	@Matches(/^[0-9a-zA-Z]+$/, {
		message:
			'Поле username должно состоять из цифр и букв латинского алфавита.',
	})
	login: string

	@IsNotEmpty({ message: 'Поле email не должно быть пустым' })
	@IsEmail({}, { message: 'Поле email должно удовлетворять структуре почт.' })
	email: string

	@IsNotEmpty({ message: 'Поле password не должно быть пустым' })
	@Length(8, 16, {
		message: 'Поле password должно содержать от 8 до 16 символов.',
	})
	@Matches(/^[A-Za-z0-9]+$/, {
		message:
			'Поле password должно состоять из цифр и букв латинского алфавита.',
	})
	@Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/, {
		message:
			'Поле password должно содержать хотя-бы одну заглавную, одну строчную букву и цифру',
	})
	password: string

	@Length(1, 15, {
		message:
			'Поле username должно содержать не больше 15 символов и не быть пустым.',
	})
	@Matches(/^[0-9a-zA-Z]+$/, {
		message:
			'Поле username должно состоять из цифр и букв латинского алфавита.',
	})
	username: string
}
