import { AbstractEntity } from '@src/common/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { WorkingTime } from './dto/branchWokingTime.dto';
@Entity({ name: 'branchs' })
export class BranchEntity extends AbstractEntity {
  @Column()
  name: string;
  @Column()
  displayName: string;
  @Column()
  color: string;
  @Column({ type: 'jsonb', nullable: true })
  workingTime: WorkingTime;

  @OneToMany(() => UserEntity, (user) => user.branch)
  users?: UserEntity[];
}
