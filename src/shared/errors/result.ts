import { DomainError } from './domain-error'

export class Result {
  public isSuccess: boolean
  public isFailure: boolean
  private readonly _stack: string
  public get stack() {
    return this._stack
  }

  private readonly _error: DomainError

  public constructor(isSuccess: boolean, error: DomainError) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error')
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this._error = error
    this._stack = Error().stack

    Object.freeze(this)
  }

  public getError(): DomainError {
    return this._error
  }

  public toString(): string {
    return JSON.stringify({
      isSuccess: this.isSuccess,
      isFailure: this.isFailure,
      stack: this.stack,
      error: this._error
    })
  }
}
