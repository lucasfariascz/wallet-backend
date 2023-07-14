import { Result } from '@/shared/errors/result'
import { DomainError } from '@/shared/errors/domain-error'

export class InputError extends Result {
  public constructor(error: DomainError) {
    super(false, error)
  }

  public static create(errors: DomainError): InputError {
    return new InputError(errors)
  }
}
