import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from '../branch/branch.entity';
import { LevelEntity } from '../level/level.entity';
import { PostitionEntity } from '../postition/postition.entity';
import { UserTypeEntity } from '../UserType/userType.entity';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BranchEntity,
      LevelEntity,
      UserTypeEntity,
      PostitionEntity,
    ]),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
