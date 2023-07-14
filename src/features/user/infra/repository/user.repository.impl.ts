import { TYPES } from '@/configuration/dependency-injection/types'
import { injectable, inject } from 'inversify'
import { User } from '../../domain/entities/user'
import { UserRepository } from '../../domain/repositories/user.repository'
import { Repository } from 'typeorm'
import { UserModel } from '../database/user.model'
import { RepositoryService } from '@/shared/database/repository.service'
import { userMapper } from '@/configuration/automapper/mapper.user'

@injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly userRepository: Repository<UserModel>
  constructor(@inject(TYPES.RepositoryService) repositoryService: RepositoryService) {
    this.userRepository = repositoryService.getRepository(UserModel)
  }

  async findUserById(id: string): Promise<User> {
    const userModel = await this.userRepository.createQueryBuilder('user').where('"user"."Id" = :id', { id: id }).getOne()
    return userMapper.map(userModel, User, UserModel)
  }

  async checkUserWithBalance(userId: string, currencyId: string): Promise<UserModel> {
    const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.balances', 'balances')
      .where('"user"."Id" = :id', { id: userId })
      .andWhere('balances.currencyId = :currencyId', { currencyId }).getOne()
    return user
  }
}
