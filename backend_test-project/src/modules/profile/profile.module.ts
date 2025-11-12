import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'src/models/users.model'

@Module({
	controllers: [ProfileController],
	providers: [ProfileService],
	imports: [TypeOrmModule.forFeature([Users])],
})
export class ProfileModule {}
