import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import EntityModel from './entity.model'

export default abstract class FullAuditedEntityModel extends EntityModel {
  @Column({ name: 'CreatorId', type: 'uuid', nullable: true })
  creatorId?: string

  @CreateDateColumn({ name: 'CreationTime', type: 'timestamp' })
  creationTime: Date

  @Column({ name: 'LastModifierId', type: 'uuid', nullable: true })
  lastModifierId?: string

  @UpdateDateColumn({ name: 'LastModificationTime', type: 'timestamp', nullable: true })
  lastModificationTime?: Date

  @Column({ name: 'DeleterId', type: 'uuid', nullable: true })
  deleterId?: string

  @DeleteDateColumn({ name: 'DeletionTime', type: 'timestamp', nullable: true })
  deletionTime?: Date
}
