import { LogService } from '@/services/log/log-service'
import { LogServiceImpl } from '@/services/log/log-service.impl'
import { TypeormConfig } from '../config/typeorm-config'
import { TypeormTestLocalConfig } from '../tests/typeorm-test-local-config'

export default class TypeOrmConnection {
  logs: LogService

  constructor() {
    this.logs = new LogServiceImpl()
  }

  public async openConnection(): Promise<void> {
    if (process.env.NODE_ENV === 'test_local') {
      return TypeormTestLocalConfig.initialize().then(() => {
        this.logs.debug('Running Testing Database - Test Local')
      })
    } else {
      return TypeormConfig.initialize().then(() => {
        this.logs.debug('Running Testing Database')
      })
    }
  }

  public async getConnection(): Promise<void> {
    return this.openConnection()
      .then(() => {
        this.logs.debug('Connection has been established successfully.')
      })
      .catch((error) => {
        this.logs.error(`Unable to connect to the database: ${error}`)
      })
  }

  public async closeConnection(): Promise<void> {
    if (process.env.NODE_ENV === 'test_local') {
      return TypeormTestLocalConfig.destroy()
    } else {
      return TypeormConfig.destroy()
    }
  }
}
