import 'reflect-metadata'
import winston, { Logger } from 'winston'
import { injectable } from 'inversify'
import { LogService } from './log-service'
import { LogMessage, LogObject, LogOperation, ResultType } from './log-object'
import safeJsonStringify from 'safe-json-stringify'

const { json } = winston.format

@injectable()
export class LogServiceImpl implements LogService {
  getLogger(): Logger {
    return winston.createLogger({
      level: process.env.LOG_LEVEL,
      format: json(),
      transports: [
        new winston.transports.Console({
          format: json()
        })
      ]
    })
  }

  private getLogObject(): LogObject {
    return {
      timestamp: new Date(),
      level: process.env.LOG_LEVEL
    }
  }

  info(message: LogOperation) {
    const logObj = this.getLogObject()
    logObj.content = message
    this.getLogger().info(safeJsonStringify(logObj))
  }

  debug(message: string | LogMessage) {
    const logObj = this.getLogObject()
    if (typeof message === 'string') {
      logObj.content = { message: message, resultType: ResultType.Success }
    } else {
      logObj.content = message
    }

    this.getLogger().debug(safeJsonStringify(logObj))
  }

  http(message: string | LogMessage) {
    const logObj = this.getLogObject()
    if (typeof message === 'string') {
      logObj.content = { message: message, resultType: ResultType.Success }
    } else {
      logObj.content = message
    }
    this.getLogger().http(safeJsonStringify(logObj))
  }

  error(message: string | LogMessage) {
    const logObj = this.getLogObject()
    if (typeof message === 'string') {
      logObj.content = { message: message, resultType: ResultType.Error }
    } else {
      logObj.content = message
    }
    this.getLogger().error(safeJsonStringify(logObj))
  }
}
