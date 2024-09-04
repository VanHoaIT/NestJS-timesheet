import { sexType } from '@src/common/constants/sexType';
import { AbstractEntity } from '@src/common/database/abstract.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BranchEntity } from '../branch/branch.entity';
import { LevelEntity } from '../level/level.entity';
import { PostitionEntity } from '../postition/postition.entity';
import { UserTypeEntity } from '../UserType/userType.entity';
@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true, type: 'varchar' })
  firstName?: string;

  @Column({ nullable: true, type: 'varchar' })
  lastName?: string;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  /*
   Auto hash using UserSubscriber
  */
  @Exclude()
  password?: string;

  @Column()
  sex: sexType;

  @Column({ default: 1 })
  active: boolean;

  @Column({ nullable: true, type: 'varchar' })
  @Exclude()
  hashRefreshToken?: string;

  @Column({ nullable: true, type: 'varchar' })
  @Exclude()
  hashRecoveryToken?: string;

  @ManyToOne(() => BranchEntity, (branch) => branch.users)
  @JoinColumn({ name: 'branch_id' })
  branch?: BranchEntity;

  @ManyToOne(() => UserTypeEntity, (type) => type.users)
  @JoinColumn({ name: 'userType_id' })
  type?: UserTypeEntity;

  @ManyToOne(() => LevelEntity, (level) => level.users)
  @JoinColumn({ name: 'level_id' })
  level?: LevelEntity;

  @ManyToOne(() => PostitionEntity, (postition) => postition.users)
  @JoinColumn({ name: 'postition_id' })
  postition?: PostitionEntity;
}
