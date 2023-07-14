import { Container } from 'inversify'
import { TYPES } from './types'
import { LogService } from '@/services/log/log-service'
import { LogServiceImpl } from '@/services/log/log-service.impl'
import { UserRepository } from '@/features/user/domain/repositories/user.repository'
import { UserRepositoryImpl } from '@/features/user/infra/repository/user.repository.impl'
import { GetUserUseCase } from '@/features/user/domain/use-cases/get-user.use-case'
import { GetUserUseCaseImpl } from '@/features/user/domain/use-cases/get-user.use-case.impl'
import { RepositoryService } from '@/shared/database/repository.service'
import { RepositoryServiceImpl } from '@/shared/database/repository.service.impl'
import { OfferRepository } from '@/features/offer/domain/repositories/offer.repository'
import { OfferRepositoryImpl } from '@/features/offer/infra/repository/offer.repository.impl'
import { ListOffersController } from '@/features/offer/presentation/controller/list-offers.controller'
import { ListOffersUseCaseImpl } from '@/features/offer/domain/use-cases/list-offers.use-case.impl'
import { ListOffersUseCase } from '@/features/offer/domain/use-cases/list-offers.use-case'
import { SubmitOfferController } from '@/features/offer/presentation/controller/submit-offer.controller'
import { SubmitOfferUseCase } from '@/features/offer/domain/use-cases/submit-offer.use-case'
import { SubmitOfferUseCaseImpl } from '@/features/offer/domain/use-cases/submit-offer.use-case.impl'

export function bindRepositories(DIContainer: Container) {
  DIContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl)
  DIContainer.bind<OfferRepository>(TYPES.OfferRepository).to(OfferRepositoryImpl)
}

export function bindServices(DIContainer: Container) {
  DIContainer.bind<LogService>(TYPES.LogService).to(LogServiceImpl)
  DIContainer.bind<RepositoryService>(TYPES.RepositoryService).to(RepositoryServiceImpl)
}

export function bindUseCases(DIContainer: Container) {
  DIContainer.bind<GetUserUseCase>(TYPES.GetUserUseCase).to(GetUserUseCaseImpl)
  DIContainer.bind<ListOffersUseCase>(TYPES.ListOffersUseCase).to(ListOffersUseCaseImpl)
  DIContainer.bind<SubmitOfferUseCase>(TYPES.SubmitOfferUseCase).to(SubmitOfferUseCaseImpl)
}

export function bindControllers(DIContainer: Container) {
  DIContainer.bind<ListOffersController>(ListOffersController).toSelf()
  DIContainer.bind<SubmitOfferController>(SubmitOfferController).toSelf()
}
