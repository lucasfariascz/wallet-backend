import { Offer } from '../entities/offer'

export interface ListOffersUseCase {
  execute(requestOffer: Offer): Promise<Offer[]>
}
