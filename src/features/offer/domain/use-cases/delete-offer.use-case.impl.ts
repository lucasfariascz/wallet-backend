import { TYPES } from '@/configuration/dependency-injection/types'
import { inject, injectable } from 'inversify'
import { DeleteOfferInputDTO } from '../../presentation/dto/delete-offer.input.dto'
import { OfferRepository } from '../repositories/offer.repository'
import { DeleteOfferUseCase } from './delete-offer.use-case'

@injectable()
export class DeleteOfferUseCaseImpl implements DeleteOfferUseCase {
  private readonly offerRepository: OfferRepository

  constructor(@inject(TYPES.OfferRepository) offerRepository: OfferRepository) {
    this.offerRepository = offerRepository
  }

  async execute(deleteRequest: DeleteOfferInputDTO): Promise<string> {
    return await this.offerRepository.deleteOffer(deleteRequest)
  }
}
