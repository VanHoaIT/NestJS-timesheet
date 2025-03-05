import { AbstractEntity } from '@src/common/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
@Entity({ name: 'positions' })
export class PositionEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  short_name?: string;

  @Column({ nullable: true })
  code?: string;

  @OneToMany(() => UserEntity, (user) => user.position)
  users?: UserEntity[];
}
