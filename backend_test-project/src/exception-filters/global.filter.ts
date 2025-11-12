import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import type { Response, Request } from 'express'

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const resException = exception.getResponse()
		const request = ctx.getRequest<Request>()
		const status = exception.getStatus()
		const type = exception.message || 'Неизвестная ошибка'

		const message = resException['message'] ? resException['message'] : 'Нет'
		response.status(status).json({
			path: request.url,
			status,
			type,
			message,
		})
	}
}
