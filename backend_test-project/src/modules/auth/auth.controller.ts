import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { DtoRegister } from './dto/register.dto'
import { DtoLogin } from './dto/login/login-input.dto'
import type { Response } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async regUsers(@Body() dto: DtoRegister) {
		return await this.authService.register(dto)
	}

	@Post('login')
	async loginUsers(@Body() dto: DtoLogin) {
		return await this.authService.login(dto)
	}
}
