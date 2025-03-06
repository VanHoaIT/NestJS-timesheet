import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoEntity } from './userInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfoEntity])],
  controllers: [],
  exports: [],
  providers: [],
})
export class UserInfoModule {}
