import { AbstractEntity } from '@src/common/database/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
@Entity({ name: 'user-info' })
export class UserInfoEntity extends AbstractEntity {
  @OneToOne(() => UserEntity, (user) => user.userInfo)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'varchar' })
  bank: string;

  @Column({ type: 'varchar' })
  bank_account: string;

  @Column({ type: 'varchar' })
  current_address: string;
}
