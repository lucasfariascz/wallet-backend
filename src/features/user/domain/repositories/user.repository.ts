import { UserModel } from '../../infra/database/user.model'
import { User } from '../entities/user'

export interface UserRepository {
  findUserById(id: string): Promise<User>
  checkUserWithBalance(userId: string, currencyId: string): Promise<UserModel>
}
