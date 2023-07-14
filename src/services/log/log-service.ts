import { LogMessage, LogOperation } from './log-object'

export interface LogService {
  info(message: LogOperation)
  http(message: string | LogMessage)
  debug(message: string | LogMessage)
  error(message: string | LogMessage)
}
