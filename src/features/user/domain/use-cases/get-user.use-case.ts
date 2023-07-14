import { User } from '../entities/user'

export interface GetUserUseCase {
  execute(request: User): Promise<User>
}
