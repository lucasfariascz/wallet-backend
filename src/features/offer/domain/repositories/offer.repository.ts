import { Offer } from '../entities/offer'

export interface OfferRepository {
  listOffers(): Promise<Offer[]>
}
