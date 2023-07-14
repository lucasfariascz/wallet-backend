import { Entity, Column, ManyToOne } from 'typeorm'
import FullAuditedEntityModel from '@/shared/database/full-audited-entity.model'
import { UserModel } from './user.model'
import { CurrencyModel } from './currency.model'

@Entity('Balance')
export class BalanceModel extends FullAuditedEntityModel {
  @ManyToOne(() => UserModel, userModel => userModel.balances)
  user: UserModel

  @ManyToOne(() => CurrencyModel, currencyModel => currencyModel.balances)
  currency: CurrencyModel

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  balance: number
}
