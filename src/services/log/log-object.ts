export enum ResultType {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export interface LogObject {
  timestamp: Date
  level: string
  content?: LogMessage | LogOperation
}

export interface LogOperation {
  class: string
  endpoint?: string
  method: string
  async?: boolean
  args: string
  result?: any
}

export interface LogMessage {
  message: string
  resultType?: ResultType
  httpStatus?: number
}
