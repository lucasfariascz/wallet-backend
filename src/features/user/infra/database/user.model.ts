import { CurrencyOfferModel } from '@/features/offer/infra/database/currencyOffer.model'
import FullAuditedEntityModel from '@/shared/database/full-audited-entity.model'
import { Entity, Column, OneToMany } from 'typeorm'
import { BalanceModel } from './balance.model'
import { WalletModel } from './wallet.model'

@Entity('User')
export class UserModel extends FullAuditedEntityModel {
  @Column({ name: 'Name', nullable: true })
  name: string

  @Column({ name: 'Email' })
  email: string

  @OneToMany(() => WalletModel, walletModel => walletModel.user)
  wallets: WalletModel[]

  @OneToMany(() => BalanceModel, balanceModel => balanceModel.user)
  balances: BalanceModel[]

  @OneToMany(() => CurrencyOfferModel, currencyOfferModel => currencyOfferModel.user)
  currencyOffers: CurrencyOfferModel[];
}
