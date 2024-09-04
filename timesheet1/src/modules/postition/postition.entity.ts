import { AbstractEntity } from '@src/common/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
@Entity({ name: 'postitions' })
export class PostitionEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  code: string;

  @Column()
  color: string;

  @OneToMany(() => UserEntity, (user) => user.postition)
  users?: UserEntity[];
}
