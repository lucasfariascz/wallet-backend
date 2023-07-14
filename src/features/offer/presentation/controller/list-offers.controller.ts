import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'
import { TYPES } from '@/configuration/dependency-injection/types'
import { ListOffersUseCase } from '../../domain/use-cases/list-offers.use-case'
import { handleError } from '@/shared/errors/error-handler'
import { ListOffersOutputDTO } from '../dto/list-offers-output.dto'
import { offerMapper } from '@/configuration/automapper/mapper.offer'
import { Offer } from '../../domain/entities/offer'
import { Request } from 'express'
import { ListOffersDTO } from '../dto/list-offers.dto'

@controller('/list-offers')
export class ListOffersController {
  private readonly listOffersUseCase: ListOffersUseCase
  constructor(@inject(TYPES.ListOffersUseCase) listOffersUseCase: ListOffersUseCase) {
    this.listOffersUseCase = listOffersUseCase
  }

  @httpGet('/')
  async listOffers(request: Request): Promise<ListOffersDTO> {
    const offer = new Offer()
    offer.pageSize = request.body.pageSize
    offer.pageNumber = request.body.pageNumber
    return this.listOffersUseCase
      .execute(offer)
      .then((offer) => {
        const listOffersOutputDTO = offerMapper.mapArray(offer, ListOffersOutputDTO, Offer)
        const listOffersDTO = new ListOffersDTO()
        listOffersDTO.listOffers = listOffersOutputDTO
        listOffersDTO.totalOffer = listOffersOutputDTO.length
        return listOffersDTO
      })
      .catch((error) => {
        throw handleError(error)
      })
  }
}
