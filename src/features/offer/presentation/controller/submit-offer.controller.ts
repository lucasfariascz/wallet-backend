import { inject } from 'inversify'
import { controller, httpPost } from 'inversify-express-utils'
import { TYPES } from '@/configuration/dependency-injection/types'
import { SubmitOfferUseCase } from '../../domain/use-cases/submit-offer.use-case'
import { handleError } from '@/shared/errors/error-handler'
import { Request } from 'express'
import { SubmitOfferInputDTO } from '../dto/submit-offer.input.dto'

@controller('/submit-offer')
export class SubmitOfferController {
  private readonly submitOfferUseCase: SubmitOfferUseCase
  constructor(@inject(TYPES.SubmitOfferUseCase) submitOfferUseCase: SubmitOfferUseCase) {
    this.submitOfferUseCase = submitOfferUseCase
  }

  @httpPost('/')
  async submitOffer(request: Request): Promise<string> {
    const submitRequest = new SubmitOfferInputDTO()
    submitRequest.userId = request.body.userId
    submitRequest.currencyId = request.body.currencyId
    submitRequest.unitPrice = request.body.unitPrice
    submitRequest.quantity = request.body.quantity
    return this.submitOfferUseCase
      .execute(submitRequest)
      .then((result) => {
        return result
      })
      .catch((error) => {
        throw handleError(error)
      })
  }
}
