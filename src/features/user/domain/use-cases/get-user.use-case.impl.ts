import { TYPES } from '@/configuration/dependency-injection/types'
import { inject, injectable } from 'inversify'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user.repository'
import { CommonValidator } from '@/shared/utils/common-validator'
import { UserNotFoundError } from '@/shared/errors/business-error'
import { GetUserUseCase } from './get-user.use-case'

@injectable()
export class GetUserUseCaseImpl implements GetUserUseCase {
  private readonly userRepository: UserRepository

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(request: User): Promise<User> {
    await GetUserUseCaseImpl.validateUser(request)
    const foundUser = await this.userRepository.findUserById(request.id)
    if (!foundUser) {
      return Promise.reject(UserNotFoundError.create())
    }
    return foundUser
  }

  static async validateUser(request: User): Promise<void> {
    await CommonValidator.validateUUID(request.id)
  }
}
