import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	Length,
	Matches,
} from 'class-validator'

export class DtoUpdate {
	@IsOptional()
	@Length(1, 15, {
		message:
			'Поле username должно содержать не больше 15 символов и не быть пустым.',
	})
	@Matches(/^[0-9a-zA-Z]+$/, {
		message:
			'Поле username должно состоять из цифр и букв латинского алфавита.',
	})
	username?: string

	@IsOptional()
	@IsNotEmpty({ message: 'Поле email не должно быть пустым' })
	@IsEmail({}, { message: 'Поле email должно удовлетворять структуре почт.' })
	email?: string
}
