import { Offer } from '../entities/offer'

export interface ListOffersUseCase {
  execute(): Promise<Offer[]>
}
