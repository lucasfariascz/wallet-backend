import { Guid } from 'guid-typescript'
import {
  DateInvalid,
  DomainError,
  EmailInvalid,
  IntNumberInvalid,
  LoginInvalid,
  NameInvalid,
  PasswordInvalid,
  PhoneInvalid,
  TimeInvalid,
  UUIDInvalid
} from '../errors/domain-error'
import { InputError } from '../errors/input-error'
import { emptyIfUndefined } from './string-transformations'

export type ErrorFunction = (_?: string) => DomainError
export type ValidateFunction = (_: unknown) => boolean

export class CommonValidator {
  static isValidPassword(value: string): boolean {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    return re.test(String(value))
  }

  static isValidEmail(value: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(value).toLowerCase())
  }

  static isValidLogin(value: string): boolean {
    const re = /^[A-ZA-z][A-ZA-z]+[A-ZA-z0-9][A-ZA-z0-9\s]+$/
    return re.test(String(value))
  }

  static isValidName(value: string): boolean {
    const re = /^[A-Za-zÀ-ú ']+ [A-Za-zÀ-ú' ]+$/
    if (!re || !value || value.replace(/ /g, '').length < 4) {
      return false
    }
    return re.test(String(value))
  }

  static isValidPhone(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    return re.test(String(value))
  }

  static isValidConfirmationCode(confirmationCode: string): boolean {
    return !!confirmationCode && confirmationCode.length === 6 && !isNaN(Number(confirmationCode))
  }

  static isValidCep(cep: string): boolean {
    const re = /[0-9]{5}-[\d]{3}/
    return re.test(String(cep))
  }

  static isValidDate(date: string): boolean {
    const re = /(^\d{2}\/\d{2}\/\d{4}$)/
    return re.test(String(date))
  }

  static isValidDateWithoutDay(date: string): boolean {
    const re = /(^\d{2}\/\d{4}$)/
    return re.test(String(date))
  }

  static isValidTime(time: string): boolean {
    const re = /(^\d{2}:\d{2}$)/
    return re.test(String(time))
  }

  static isNumber(value: string): boolean {
    return !!value && !isNaN(Number(value))
  }

  static isValidServiceNote(value: string): boolean {
    const re = /^(1\d{9})$/
    return re.test(String(value).toLowerCase())
  }

  static isValidSiteNumber(value: string): boolean {
    const re = /^(300|301|302)\d{1,}$/
    return re.test(String(value).toLowerCase())
  }

  static isValidBPC(value: string): boolean {
    const re = /^\d{10}$/
    return re.test(String(value).toLowerCase())
  }

  static isValidNIS(value: string): boolean {
    const re = /^\d{11}$/
    return re.test(String(value).toLowerCase())
  }

  static checkRequired(field: unknown, errorFunc: ErrorFunction, fieldName?: string): Promise<void> {
    if (!field && field !== false) {
      return Promise.reject(InputError.create(errorFunc(fieldName)))
    }
    return Promise.resolve()
  }

  static checkRequiredAny(fields: unknown[], errorFunc: ErrorFunction, fieldName?: string): Promise<void> {
    const found = fields?.find((field) => !!field || field === false)
    if (found === undefined) {
      return Promise.reject(InputError.create(errorFunc(fieldName)))
    }
    return Promise.resolve()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static checkLength(value: any, length: number, errorFunc: ErrorFunction, fieldName?: string): Promise<void> {
    if (value?.length !== length) {
      return Promise.reject(InputError.create(errorFunc(fieldName)))
    }
    return Promise.resolve()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static checkMinLength(value: any, length: number, errorFunc: ErrorFunction, fieldName?: string): Promise<void> {
    if (value?.length < length) {
      return Promise.reject(InputError.create(errorFunc(fieldName)))
    }
    return Promise.resolve()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static checkMaxLength(value: any, length: number, errorFunc: ErrorFunction, fieldName?: string): Promise<void> {
    if (value?.length > length) {
      return Promise.reject(InputError.create(errorFunc(fieldName)))
    }
    return Promise.resolve()
  }

  static checkEnum(value: number | string, enumType: unknown, errorFunc: ErrorFunction, fieldName?: string): Promise<void> {
    if (!enumType || !Object.values(enumType).includes(value)) {
      return Promise.reject(InputError.create(errorFunc(fieldName)))
    }
    return Promise.resolve()
  }

  static validate(field: unknown, validateFunction: ValidateFunction, errorFunc: ErrorFunction, fieldName?: string): Promise<void> {
    if (!validateFunction(field)) {
      return Promise.reject(InputError.create(errorFunc(fieldName))) // TODO Remover log quando for função - Guilherme
    }
    return Promise.resolve()
  }

  static validateUUID(id: string, fieldName = 'id'): Promise<void> {
    return this.validate(emptyIfUndefined(id), Guid.isGuid, UUIDInvalid, fieldName)
  }

  static validatePhone(phone: string, fieldName?: string): Promise<void> {
    return this.validate(phone, this.isValidPhone, PhoneInvalid, fieldName)
  }

  static validatePassword(password: string, fieldName?: string): Promise<void> {
    return this.validate(password, this.isValidPassword, PasswordInvalid, fieldName)
  }

  static validateEmail(email: string, fieldName?: string): Promise<void> {
    return this.validate(email, this.isValidEmail, EmailInvalid, fieldName)
  }

  static validateLogin(login: string, fieldName?: string): Promise<void> {
    return this.validate(login, this.isValidLogin, LoginInvalid, fieldName)
  }

  static validateName(name: string, fieldName?: string): Promise<void> {
    return this.validate(name, this.isValidName, NameInvalid, fieldName)
  }

  static validateDate(date: string, fieldName?: string): Promise<void> {
    return this.validate(date, this.isValidDate, DateInvalid, fieldName)
  }

  static validateDateWithoutDay(email: string, fieldName?: string): Promise<void> {
    return this.validate(email, this.isValidDateWithoutDay, DateInvalid, fieldName)
  }

  static validateTime(time: string, fieldName?: string): Promise<void> {
    return this.validate(time, this.isValidTime, TimeInvalid, fieldName)
  }

  static validateIntNumber(days: number, fieldName = 'days'): Promise<void> {
    return this.validate(days, this.isInt, IntNumberInvalid, fieldName)
  }

  static isInt(value: any): boolean {
    return Number.isInteger(value)
  }
}
