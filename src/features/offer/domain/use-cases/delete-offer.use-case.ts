import { DeleteOfferInputDTO } from '../../presentation/dto/delete-offer.input.dto'

export interface DeleteOfferUseCase {
  execute(deleteRequest: DeleteOfferInputDTO): Promise<string>
}
