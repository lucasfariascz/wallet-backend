import { inject } from 'inversify'
import { Request } from 'express'
import { controller, httpGet } from 'inversify-express-utils'
import { TYPES } from '@/configuration/dependency-injection/types'
import { GetUserUseCase } from '../../domain/use-cases/get-user.use-case'
import { User } from '../../domain/entities/user'
import { handleError } from '@/shared/errors/error-handler'
import { GetUserOutputDTO } from '../dto/get-user-output.dto'
import { userMapper } from '@/configuration/automapper/mapper.user'

@controller('/get-user')
export class GetUserController {
  private readonly getUserUseCase: GetUserUseCase
  constructor(@inject(TYPES.GetUserUseCase) getUserUseCase: GetUserUseCase) {
    this.getUserUseCase = getUserUseCase
  }

  @httpGet('/')
  async getUser(request: Request): Promise<GetUserOutputDTO> {
    const user = new User()
    user.id = request.user.id

    return this.getUserUseCase
      .execute(user)
      .then((user) => {
        return userMapper.map(user, GetUserOutputDTO, User)
      })
      .catch((error) => {
        throw handleError(error)
      })
  }
}
