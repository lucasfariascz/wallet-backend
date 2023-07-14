import { Container } from 'inversify'
import { bindControllers, bindRepositories, bindServices, bindUseCases } from './di-container-binding'
import './di-container-controller'

const DIContainer = new Container()

bindRepositories(DIContainer)
bindUseCases(DIContainer)
bindServices(DIContainer)
bindControllers(DIContainer)

export default DIContainer
