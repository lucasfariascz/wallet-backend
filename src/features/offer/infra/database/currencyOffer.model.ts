import { Entity, Column, ManyToOne } from 'typeorm'
import { CurrencyModel } from '@/features/user/infra/database/currency.model'
import { UserModel } from '@/features/user/infra/database/user.model'
import FullAuditedEntityModel from '@/shared/database/full-audited-entity.model'

@Entity('CurrencyOffer')
export class CurrencyOfferModel extends FullAuditedEntityModel {
  @ManyToOne(() => UserModel, userModel => userModel.currencyOffers)
  user: UserModel

  @ManyToOne(() => CurrencyModel, currency => currency.currencyOffers)
  currency: CurrencyModel

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  unitPrice: number

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  quantity: number
}
