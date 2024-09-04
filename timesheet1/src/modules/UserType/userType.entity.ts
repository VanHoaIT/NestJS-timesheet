import { AbstractEntity } from '@src/common/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
@Entity({ name: 'user-types' })
export class UserTypeEntity extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.type)
  users?: UserEntity[];
}
