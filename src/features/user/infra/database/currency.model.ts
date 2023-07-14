import { CurrencyOfferModel } from '@/features/offer/infra/database/currencyOffer.model'
import FullAuditedEntityModel from '@/shared/database/full-audited-entity.model'
import { Entity, Column, OneToMany } from 'typeorm'
import { BalanceModel } from './balance.model'
import { WalletModel } from './wallet.model'

@Entity('Currency')
export class CurrencyModel extends FullAuditedEntityModel {
  @Column()
  currencyName: string

  @Column()
  contractAddress: string

  @Column()
  symbol: string

  @OneToMany(() => WalletModel, walletModel => walletModel.currency)
  wallets: WalletModel[]

  @OneToMany(() => BalanceModel, balance => balance.currency)
  balances: BalanceModel[]

  @OneToMany(() => CurrencyOfferModel, currencyOffer => currencyOffer.user)
  currencyOffers: CurrencyOfferModel[];
}
