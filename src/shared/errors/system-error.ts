import { Result } from '@/shared/errors/result'
import { DomainError } from '@/shared/errors/domain-error'
import { STRINGS } from '@/shared/i18n/localization'

export abstract class SystemError extends Result {
  public constructor(errors: DomainError) {
    super(false, errors)
  }
}

export class InternalServerError extends SystemError {
  public static create(): InternalServerError {
    const error: DomainError = {
      message: STRINGS.InternalServerError
    }
    return new InternalServerError(error)
  }
}
