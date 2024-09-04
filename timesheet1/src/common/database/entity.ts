import { BranchEntity } from '@src/modules/branch/branch.entity';
import { LevelEntity } from '@src/modules/level/level.entity';
import { PostitionEntity } from '@src/modules/postition/postition.entity';
import { UserTypeEntity } from '@src/modules/UserType/userType.entity';
import { UserEntity } from 'src/modules/user/user.entity';

const entities = [
  UserEntity,
  BranchEntity,
  UserTypeEntity,
  LevelEntity,
  PostitionEntity,
];
export default entities;
