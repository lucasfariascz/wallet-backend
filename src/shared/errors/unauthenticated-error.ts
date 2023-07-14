import { DomainError } from './domain-error'
import { Result } from './result'
import { STRINGS } from '@/shared/i18n/localization'

export class UnauthenticatedError extends Result {
  public constructor(error: DomainError) {
    super(false, error)
  }

  public static create(): UnauthenticatedError {
    const error: DomainError = {
      message: STRINGS.FailedLoginMessage
    }
    return new UnauthenticatedError(error)
  }
}
