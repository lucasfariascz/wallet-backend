import { Entity, Column, ManyToOne } from 'typeorm'
import FullAuditedEntityModel from '@/shared/database/full-audited-entity.model'
import { UserModel } from './user.model'
import { CurrencyModel } from './currency.model'

@Entity('Wallet')
export class WalletModel extends FullAuditedEntityModel {
  @ManyToOne(() => UserModel, user => user.wallets)
  user: UserModel

  @ManyToOne(() => CurrencyModel, currencyModel => currencyModel.wallets)
  currency: CurrencyModel

  @Column()
  address: string
}
