import { TYPES } from '@/configuration/dependency-injection/types'
import { inject, injectable } from 'inversify'
import { Offer } from '../entities/offer'
import { OfferRepository } from '../repositories/offer.repository'
import { ListOffersUseCase } from './list-offers.use-case'

@injectable()
export class ListOffersUseCaseImpl implements ListOffersUseCase {
  private readonly offerRepository: OfferRepository

  constructor(@inject(TYPES.OfferRepository) offerRepository: OfferRepository) {
    this.offerRepository = offerRepository
  }

  async execute(requestOffer: Offer): Promise<Offer[]> {
    return await this.offerRepository.listOffers(requestOffer)
  }
}
