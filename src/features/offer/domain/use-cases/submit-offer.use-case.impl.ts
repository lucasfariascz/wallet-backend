import { TYPES } from '@/configuration/dependency-injection/types'
import { UserRepository } from '@/features/user/domain/repositories/user.repository'
import { inject, injectable } from 'inversify'
import { SubmitOfferInputDTO } from '../../presentation/dto/submit-offer.input.dto'
import { OfferRepository } from '../repositories/offer.repository'
import { SubmitOfferUseCase } from './submit-offer.use-case'

@injectable()
export class SubmitOfferUseCaseImpl implements SubmitOfferUseCase {
  private readonly offerRepository: OfferRepository
  private readonly userRepository: UserRepository

  constructor(@inject(TYPES.OfferRepository) offerRepository: OfferRepository, @inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.offerRepository = offerRepository
    this.userRepository = userRepository
  }

  async execute(submitRequest: SubmitOfferInputDTO): Promise<string> {
    const userModel = await this.userRepository.checkUserWithBalance(submitRequest.userId, submitRequest.currencyId)
    if (userModel.balances && userModel.balances.length > 0) {
      if (userModel.balances[0].balance >= submitRequest.quantity) {
        return await this.offerRepository.submitOffer(submitRequest)
      }
    }
    return 'Não foi possível criar a oferta!'
  }
}
