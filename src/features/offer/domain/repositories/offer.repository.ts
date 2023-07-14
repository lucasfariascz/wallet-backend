import { DeleteOfferInputDTO } from '../../presentation/dto/delete-offer.input.dto'
import { SubmitOfferInputDTO } from '../../presentation/dto/submit-offer.input.dto'
import { Offer } from '../entities/offer'

export interface OfferRepository {
  listOffers(requestOffer: Offer): Promise<Offer[]>
  submitOffer(submitRequest: SubmitOfferInputDTO): Promise<string>
  checkOffers(): Promise<number>
  deleteOffer(deleteRequest: DeleteOfferInputDTO): Promise<string>
}
