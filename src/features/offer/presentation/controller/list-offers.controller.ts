import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'
import { TYPES } from '@/configuration/dependency-injection/types'
import { ListOffersUseCase } from '../../domain/use-cases/list-offers.use-case'
import { handleError } from '@/shared/errors/error-handler'
import { ListOffersOutputDTO } from '../dto/list-offers-output.dto'
import { offerMapper } from '@/configuration/automapper/mapper.offer'
import { Offer } from '../../domain/entities/offer'

@controller('/list-offers')
export class ListOffersController {
  private readonly listOffersUseCase: ListOffersUseCase
  constructor(@inject(TYPES.ListOffersUseCase) listOffersUseCase: ListOffersUseCase) {
    this.listOffersUseCase = listOffersUseCase
  }

  @httpGet('/')
  async listOffers(): Promise<ListOffersOutputDTO[]> {
    return this.listOffersUseCase
      .execute()
      .then((offer) => {
        return offerMapper.mapArray(offer, Offer, ListOffersOutputDTO)
      })
      .catch((error) => {
        throw handleError(error)
      })
  }
}
