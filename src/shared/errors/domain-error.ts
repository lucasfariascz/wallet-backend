import { STRINGS } from '@/shared/i18n/localization'

export interface DomainError {
  field?: string
  message: string
  error?: unknown
}

function _buildDomainError(field: string, message: string): DomainError {
  return {
    field: field,
    message: message
  }
}

export function UserFindNot(field = 'id', message = STRINGS.UserFindNot): DomainError {
  return _buildDomainError(field, message)
}

export function UUIDInvalid(field = 'id', message = STRINGS.UUIDInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function IdDeviceRequired(field = 'idDevice', message = STRINGS.UUIDInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function PhoneRequired(field = 'phone', message = STRINGS.PhoneNumberRequired): DomainError {
  return _buildDomainError(field, message)
}

export function HidricParamRequired(field = 'hidricParam', message = STRINGS.HidricParam): DomainError {
  return _buildDomainError(field, message)
}

export function PhoneInvalid(field = 'phone', message = STRINGS.PhoneNumberInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function PasswordInvalid(field = 'password', message = STRINGS.PasswordInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function EmailInvalid(field = 'email', message = STRINGS.EmailInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function EmailAlreadyExists(field = 'email', message = STRINGS.EmailAlreadyExists): DomainError {
  return _buildDomainError(field, message)
}

export function LoginInvalid(field = 'login', message = STRINGS.LoginInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function NameInvalid(field = 'name', message = STRINGS.NameInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function DateInvalid(field = 'date', message = STRINGS.DateInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function TimeInvalid(field = 'time', message = STRINGS.TimeInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function IntNumberInvalid(field = 'days', message = STRINGS.NumberInvalid): DomainError {
  return _buildDomainError(field, message)
}

export function FieldRequired(field = 'field', message = STRINGS.FieldRequired): DomainError {
  return _buildDomainError(field, message)
}

export function StateCodeInvalid(field = 'stateCode', message = STRINGS.StateInvalid): DomainError {
  return _buildDomainError(field, message)
}
