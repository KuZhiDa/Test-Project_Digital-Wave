import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { JwtGuard } from 'src/common/guards/jwt.guard'
import { GetUser } from 'src/common/decorators/get-user.decorator'
import { DtoUpdate } from './dto/update.dto'

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@UseGuards(JwtGuard)
	@Get()
	async getUser(@GetUser() id: number) {
		return await this.profileService.getInfo(id)
	}

	@UseGuards(JwtGuard)
	@Patch()
	async patchUser(@Body() dto: DtoUpdate, @GetUser() id: number) {
		return await this.profileService.updateInfo(dto, id)
	}
}
