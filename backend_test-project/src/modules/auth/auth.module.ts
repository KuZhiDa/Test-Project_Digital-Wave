import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'src/models/users.model'

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [TypeOrmModule.forFeature([Users]), JwtModule],
})
export class AuthModule {}
