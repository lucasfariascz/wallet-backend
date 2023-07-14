import { PrimaryColumn } from 'typeorm'

export default abstract class EntityModel {
  @PrimaryColumn({ name: 'Id', type: 'uuid' })
  id?: string
}
