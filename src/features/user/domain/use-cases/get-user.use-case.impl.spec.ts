import 'reflect-metadata'
import { UserNotFoundError } from '@/shared/errors/business-error'
import { describeText, testDescription } from '@/shared/tests/tests-naming'
import { mockedCommonValidator, userRepositoryMock } from '@/shared/unit_testing/mocks'
import { User } from '../entities/user'
import { GetUserUseCaseImpl } from './get-user.use-case.impl'

const _validateUser = 'validateUser'

const mockUser = () => {
  const user = new User()
  user.id = 'f07137f4-f6b4-2f84-83a7-cc50b5429005'
  user.name = 'João da Silva'
  user.email = 'joaosilva@gmail.com'
  user.password = 'TestY@ra.123'
  user.city = 'Parintins'
  user.state = 'AM'
  return user
}

describe(describeText('GetUserUseCaseImpl'), () => {
  test(testDescription('execute', 'success'), async () => {
    // Prepare
    const request = mockUser()
    userRepositoryMock.findUserById.mockResolvedValue(request)

    const getUserUseCase = new GetUserUseCaseImpl(userRepositoryMock)

    const spyValidateUser = jest.spyOn(GetUserUseCaseImpl, _validateUser).mockResolvedValue(undefined)

    // Act
    const result = await getUserUseCase.execute(request)

    // Assert
    expect(spyValidateUser).toBeCalledTimes(1)
    expect(spyValidateUser).toBeCalledWith(request)
    expect(result.name).toEqual(request.name)
    expect(result.email).toEqual(request.email)
    expect(result.city).toEqual(request.city)
    expect(result.state).toEqual(request.state)
    expect.assertions(6)
    spyValidateUser.mockRestore()
  })

  test(testDescription('execute', 'error UserNotFoundError'), async () => {
    // Prepare
    const request = mockUser()
    userRepositoryMock.findUserById.mockResolvedValue(undefined)

    const getUserUseCase = new GetUserUseCaseImpl(userRepositoryMock)

    const spyValidateUser = jest.spyOn(GetUserUseCaseImpl, _validateUser).mockResolvedValue(undefined)

    // Act
    await expect(getUserUseCase.execute(request)).rejects.toBeInstanceOf(UserNotFoundError)

    // Assert
    expect(spyValidateUser).toBeCalledTimes(1)
    expect(spyValidateUser).toBeCalledWith(request)
    expect.assertions(3)
    spyValidateUser.mockRestore()
  })

  test(testDescription('validate user'), async () => {
    // Prepare
    const request = mockUser()
    mockedCommonValidator.validateUUID.mockResolvedValue(undefined)

    // Act
    await expect(GetUserUseCaseImpl.validateUser(request)).resolves.toEqual(undefined)

    // Assert
    expect(mockedCommonValidator.validateUUID).toBeCalledTimes(1)
    expect(mockedCommonValidator.validateUUID).toBeCalledWith(request.id)
    expect.assertions(3)
  })
})
