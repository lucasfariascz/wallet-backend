import { DeviceRepository } from '@/features/device/domain/repositories/device.repository'
import { LoginRepository } from '@/features/login/domain/repositories/login.repository'
import { UserRepository } from '@/features/user/domain/repositories/user.repository'
import { LogService } from '@/services/log/log-service'
import { RepositoryService } from '../database/repository.service'
import { CommonValidator } from '../utils/common-validator'

export const loginRepositoryMock: jest.Mocked<LoginRepository> = {
  login: jest.fn()
}

export const userRepositoryMock: jest.Mocked<UserRepository> = {
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
  findUserByEmailWithRole: jest.fn(),
  findUserByIdWithRole: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn()
}

export const deviceRepositoryMock: jest.Mocked<DeviceRepository> = {
  findDevice: jest.fn(),
  getDevices: jest.fn(),
  countStatusDevices: jest.fn(),
  findDeviceByFilterSamples: jest.fn(),
  findDeviceByFilterSampleHidric: jest.fn(),
  getDeviceConfig: jest.fn(),
  putDeviceConfig: jest.fn()
}

export const logServiceMock: jest.Mocked<LogService> = {
  http: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn()
}

export const repositoryServiceMock: jest.Mocked<RepositoryService> = {
  getRepository: jest.fn()
}

export const mockedCommonValidator = CommonValidator as jest.Mocked<typeof CommonValidator>
mockedCommonValidator.validateName = jest.fn()
mockedCommonValidator.validateEmail = jest.fn()
mockedCommonValidator.validatePassword = jest.fn()
mockedCommonValidator.checkRequired = jest.fn()
mockedCommonValidator.validateUUID = jest.fn()
mockedCommonValidator.checkRequiredAny = jest.fn()
