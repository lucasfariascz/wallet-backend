import { injectable } from 'inversify'
import { TypeormConfig } from '../config/typeorm-config'
import { RepositoryService } from './repository.service'

@injectable()
export class RepositoryServiceImpl implements RepositoryService {
  getRepository(repository: any): any {
    return TypeormConfig.getRepository(repository)
  }
}
