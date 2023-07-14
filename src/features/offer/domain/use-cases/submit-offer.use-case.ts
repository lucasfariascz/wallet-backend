import { SubmitOfferInputDTO } from '../../presentation/dto/submit-offer.input.dto'

export interface SubmitOfferUseCase {
  execute(submitRequest: SubmitOfferInputDTO): Promise<string>
}
