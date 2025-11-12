import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './models/users.model'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ProfileModule } from './modules/profile/profile.module'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'db',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'postgres',
			entities: [Users],
			synchronize: true,
		}),
		AuthModule,
		ProfileModule,
	],
	providers: [JwtStrategy],
})
export class AppModule {}
