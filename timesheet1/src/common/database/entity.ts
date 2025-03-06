import { BranchEntity } from '@src/modules/branch/branch.entity';
import { LevelEntity } from '@src/modules/level/level.entity';
import { PositionEntity } from '@src/modules/position/position.entity';
import { UserInfoEntity } from '@src/modules/userInfo/userInfo.entity';
import { UserTypeEntity } from '@src/modules/UserType/userType.entity';
import { UserEntity } from 'src/modules/user/user.entity';

const entities = [
  UserEntity,
  BranchEntity,
  UserTypeEntity,
  LevelEntity,
  PositionEntity,
  UserInfoEntity,
];
export default entities;
