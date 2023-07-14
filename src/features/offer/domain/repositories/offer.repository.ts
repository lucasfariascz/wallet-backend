import { SubmitOfferInputDTO } from '../../presentation/dto/submit-offer.input.dto'
import { Offer } from '../entities/offer'

export interface OfferRepository {
  listOffers(): Promise<Offer[]>
  submitOffer(submitRequest: SubmitOfferInputDTO): Promise<string>
}
