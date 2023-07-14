import 'reflect-metadata'
import app from './app'
import { port } from './shared/config/app-config'

const _port = port()
const server = app.build()
server
  .listen(_port, () => {
    console.log('Application running on port: ' + _port)
  })
  .setTimeout(60 * 5 * 1000) // three minutes of timeout
