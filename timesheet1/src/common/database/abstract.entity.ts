import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractAuditEntity {
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  createdBy!: number | null;

  @Column({
    type: 'int',
    nullable: true,
  })
  updatedBy!: number | null;
}

export abstract class AbstractEntity extends AbstractAuditEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;
}
