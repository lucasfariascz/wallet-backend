import { TYPES } from '@/configuration/dependency-injection/types'
import { injectable, inject } from 'inversify'
import { offerMapper } from '@/configuration/automapper/mapper.offer'
import { Offer } from '../../domain/entities/offer'
import { OfferRepository } from '../../domain/repositories/offer.repository'
import { Repository } from 'typeorm'
import { CurrencyOfferModel } from '../database/currencyOffer.model'
import { RepositoryService } from '@/shared/database/repository.service'

@injectable()
export class OfferRepositoryImpl implements OfferRepository {
  private readonly offerRepository: Repository<CurrencyOfferModel>
  constructor(@inject(TYPES.RepositoryService) repositoryService: RepositoryService) {
    this.offerRepository = repositoryService.getRepository(CurrencyOfferModel)
  }

  async listOffers(): Promise<Offer[]> {
    const currentDate = new Date()
    const previousDate = new Date()
    previousDate.setDate(currentDate.getDate() - 1)
    const offerModel = await this.offerRepository.createQueryBuilder('currencyOffer').where('"currencyOffer"."CreationTime" > :previousDate', { previousDate: new Date() }).getMany()
    return offerMapper.mapArray(offerModel, Offer, CurrencyOfferModel)
  }
}
