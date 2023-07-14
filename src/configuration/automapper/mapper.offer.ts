import { Offer } from '@/features/offer/domain/entities/offer'
import { CurrencyOfferModel } from '@/features/offer/infra/database/currencyOffer.model'
import { ListOffersOutputDTO } from '@/features/offer/presentation/dto/list-offers-output.dto'
import { classes } from '@automapper/classes'
import { createMapper, mapFrom } from '@automapper/core'

export const offerMapper = createMapper({
  name: 'offer',
  pluginInitializer: classes
})

offerMapper
  .createMap(Offer, ListOffersOutputDTO).forMember(
    (dst) => dst.quantity,
    mapFrom((src) => src.quantity)
  )
  .forMember(
    (dst) => dst.unitPrice,
    mapFrom((src) => src.unitPrice)
  )

offerMapper
  .createMap(CurrencyOfferModel, Offer).forMember(
    (dst) => dst.quantity,
    mapFrom((src) => src.quantity)
  )
  .forMember(
    (dst) => dst.unitPrice,
    mapFrom((src) => src.unitPrice)
  )
