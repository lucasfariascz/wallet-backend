import dotenv from 'dotenv'
import cors from 'cors'
import DIContainer from './configuration/dependency-injection/di-container'
import { InversifyExpressServer } from 'inversify-express-utils'
import { LogService } from './services/log/log-service'
import * as bodyParser from 'body-parser'
import { LogServiceImpl } from './services/log/log-service.impl'
import TypeOrmConnection from './shared/database/typeorm-connection'
import { AppError } from './shared/errors/app-error'
import express, { Request, Response, NextFunction } from 'express'

class App {
  public express: InversifyExpressServer
  logs: LogService
  constructor() {
    this.logs = new LogServiceImpl()
    this.buildEnvConfig()
    this.express = new InversifyExpressServer(DIContainer)
    this.middlewares()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.database()
  }

  private buildEnvConfig(): void {
    let configPath = '.env'
    if (process.env.NODE_ENV === 'local') {
      configPath = '.env.dev'
    }
    this.logs.debug(`loading configpath: ${configPath}`)
    dotenv.config({
      path: configPath
    })
  }

  private middlewares(): void {
    const server = this.express
    server
      .setConfig((app) => {
        app.use(
          bodyParser.urlencoded({
            extended: true
          })
        )
        app.use(cors())
        app.use(bodyParser.json())
        app.use(express.static('public'))
      })
      .setErrorConfig((app) => {
        app.use((_err: Error, _request: Request, _response: Response, _next: NextFunction) => {
          if (_err instanceof AppError) {
            return _response.status(_err.statusCode).json({
              message: _err.message,
              status: _err.statusCode
            })
          }
        })
      })
  }

  /**
   * set the database configuration
   */
  private async database(): Promise<void> {
    if (process.env.NODE_ENV !== 'test_local') {
      await new TypeOrmConnection().getConnection()
    }
  }
}

export default new App().express
