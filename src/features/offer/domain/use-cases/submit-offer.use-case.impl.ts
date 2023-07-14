import { TYPES } from '@/configuration/dependency-injection/types'
import { inject, injectable } from 'inversify'
import { SubmitOfferInputDTO } from '../../presentation/dto/submit-offer.input.dto'
import { OfferRepository } from '../repositories/offer.repository'
import { SubmitOfferUseCase } from './submit-offer.use-case'

@injectable()
export class SubmitOfferUseCaseImpl implements SubmitOfferUseCase {
  private readonly offerRepository: OfferRepository

  constructor(@inject(TYPES.OfferRepository) offerRepository: OfferRepository) {
    this.offerRepository = offerRepository
  }

  async execute(submitRequest: SubmitOfferInputDTO): Promise<string> {
    const foundUser = await this.offerRepository.submitOffer(submitRequest)

    return foundUser
  }
}
