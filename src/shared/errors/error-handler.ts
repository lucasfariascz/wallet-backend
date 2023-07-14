import { InputError } from './input-error'
import { Result } from './result'
import { LogServiceImpl } from '@/services/log/log-service.impl'
import { AppError } from './app-error'
import { HttpStatus } from './http-status-error'
import { UserNotFoundError } from './business-error'
import { UnauthenticatedError } from './unauthenticated-error'

export function handleError(value: Result | Error | any): AppError {
  const logger = new LogServiceImpl()
  logger.error('Stacktrace:' + value.stack)
  if (value instanceof UnauthenticatedError) {
    return new AppError(value.getError().message, HttpStatus.UNAUTHORIZED)
  } else if (value instanceof InputError) {
    logger.error(value.getError().message)
    return new AppError(value.getError().message, HttpStatus.BAD_REQUEST)
  } else if (value instanceof Error) {
    logger.error(JSON.stringify(value))
    return new AppError('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
  } else if (value instanceof UserNotFoundError) {
    logger.error(JSON.stringify(value))
    return new AppError(value.getError().message, HttpStatus.INTERNAL_SERVER_ERROR)
  } else {
    logger.error('GENERIC ERROR')
    return new AppError('Generic Error', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
