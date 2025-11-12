import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionsFilter } from './common/exception-filters/global.filter'
import { BadRequestException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalFilters(new GlobalExceptionsFilter())
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			skipUndefinedProperties: true,
			exceptionFactory: errors => {
				const newFormExcept = errors.reduce((acc, err) => {
					acc[err.property] = err.constraints
					return acc
				}, {})
				return new BadRequestException({ message: newFormExcept })
			},
		})
	)
	app.enableCors({ origin: 'http://localhost:3000' })
	await app.listen(5000)
}
bootstrap()
