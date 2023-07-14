import { inject } from 'inversify'
import { controller, httpDelete } from 'inversify-express-utils'
import { TYPES } from '@/configuration/dependency-injection/types'
import { DeleteOfferUseCase } from '../../domain/use-cases/delete-offer.use-case'
import { handleError } from '@/shared/errors/error-handler'
import { Request } from 'express'
import { DeleteOfferInputDTO } from '../dto/delete-offer.input.dto'

@controller('/delete-offer')
export class DeleteOfferController {
  private readonly deleteOfferUseCase: DeleteOfferUseCase
  constructor(@inject(TYPES.DeleteOfferUseCase) deleteOfferUseCase: DeleteOfferUseCase) {
    this.deleteOfferUseCase = deleteOfferUseCase
  }

  @httpDelete('/')
  async deleteOffer(request: Request): Promise<string> {
    const deleteRequest = new DeleteOfferInputDTO()
    deleteRequest.userId = request.body.userId
    deleteRequest.currencyOfferId = request.body.currencyOfferId

    return this.deleteOfferUseCase
      .execute(deleteRequest)
      .then((result) => {
        return result
      })
      .catch((error) => {
        throw handleError(error)
      })
  }
}
