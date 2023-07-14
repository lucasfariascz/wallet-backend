import { TYPES } from '@/configuration/dependency-injection/types'
import { injectable, inject } from 'inversify'
import { offerMapper } from '@/configuration/automapper/mapper.offer'
import { Offer } from '../../domain/entities/offer'
import { OfferRepository } from '../../domain/repositories/offer.repository'
import { Repository } from 'typeorm'
import { CurrencyOfferModel } from '../database/currencyOffer.model'
import { RepositoryService } from '@/shared/database/repository.service'
import { SubmitOfferInputDTO } from '../../presentation/dto/submit-offer.input.dto'
import { DeleteOfferInputDTO } from '../../presentation/dto/delete-offer.input.dto'
import { CurrencyModel } from '@/features/user/infra/database/currency.model'
import { UserModel } from '@/features/user/infra/database/user.model'
import { Guid } from 'guid-typescript'

@injectable()
export class OfferRepositoryImpl implements OfferRepository {
  private readonly offerRepository: Repository<CurrencyOfferModel>
  constructor(@inject(TYPES.RepositoryService) repositoryService: RepositoryService) {
    this.offerRepository = repositoryService.getRepository(CurrencyOfferModel)
  }

  async listOffers(requestOffer: Offer): Promise<Offer[]> {
    const currentDate = new Date()
    const previousDate = new Date()
    previousDate.setDate(currentDate.getDate() - 1)
    const offset = (requestOffer.pageNumber - 1) * requestOffer.pageSize
    const offerModel = await this.offerRepository.createQueryBuilder('currencyOffer')
      .where('"currencyOffer"."CreationTime" > :previousDate', { previousDate })
      .orderBy('"currencyOffer"."CreationTime"', 'DESC')
      .skip(offset)
      .take(requestOffer.pageSize)
      .getMany()
    return offerMapper.mapArray(offerModel, Offer, CurrencyOfferModel)
  }

  async submitOffer(submitRequest: SubmitOfferInputDTO): Promise<string> {
    const currencyOfferModel = new CurrencyOfferModel()
    currencyOfferModel.id = Guid.create().toString()
    currencyOfferModel.unitPrice = submitRequest.unitPrice
    currencyOfferModel.quantity = submitRequest.quantity
    currencyOfferModel.currency = new CurrencyModel()
    currencyOfferModel.currency.id = submitRequest.currencyId
    currencyOfferModel.user = new UserModel()
    currencyOfferModel.user.id = submitRequest.userId
    await this.offerRepository.save(currencyOfferModel)
    return 'Oferta criada com sucesso!'
  }

  async checkOffers(): Promise<number> {
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59)
    return await this.offerRepository
      .createQueryBuilder('currencyOffer')
      .where('currencyOffer.creationTime >= :startDate', { startDate })
      .andWhere('currencyOffer.creationTime <= :endDate', { endDate }).getCount()
  }

  async deleteOffer(deleteRequest: DeleteOfferInputDTO): Promise<string> {
    const isOwner = await this.offerRepository.createQueryBuilder('currencyOffer')
      .where('currencyOffer.id = :id', { id: deleteRequest.currencyOfferId })
      .andWhere('currencyOffer.userId = :userId', { userId: deleteRequest.userId })
      .getCount()

    if (isOwner) {
      await this.offerRepository.softDelete(deleteRequest.currencyOfferId)
      return 'Deletado com sucesso!'
    }
    return 'Não foi possível deletar!'
  }
}
