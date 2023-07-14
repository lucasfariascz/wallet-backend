import { Result } from '@/shared/errors/result'
import { DomainError } from '@/shared/errors/domain-error'
import { STRINGS } from '@/shared/i18n/localization'

export abstract class BusinessError extends Result {
  public constructor(error: DomainError) {
    super(false, error)
  }
}

export class UserNotFoundError extends BusinessError {
  public static create(): UserNotFoundError {
    const error: DomainError = {
      message: STRINGS.UserFindNot
    }
    return new UserNotFoundError(error)
  }
}
