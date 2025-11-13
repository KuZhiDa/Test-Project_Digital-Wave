import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './models/users.model'
import { JwtStrategy } from './common/strategies/jwt.strategy'
import { ProfileModule } from './modules/profile/profile.module'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.HOST_DB,
			port: Number(process.env.PORT_DB),
			username: process.env.USERNAME_DB,
			password: process.env.PASSWORD_DB,
			database: process.env.DATABASE_DB,
			entities: [Users],
			synchronize: true,
		}),
		AuthModule,
		ProfileModule,
	],
	providers: [JwtStrategy],
})
export class AppModule {}
