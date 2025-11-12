import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import type { Response, Request } from 'express'

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()

		let status: number
		let message: any

		if (exception instanceof HttpException) {
			status = exception.getStatus()
			const res = exception.getResponse()
			message = typeof res === 'string' ? res : res['message'] || 'Ошибка'
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR
			message = exception.message || 'Неизвестная ошибка'
		}

		response.status(status).json({
			path: request.url,
			status,
			message,
		})
	}
}
