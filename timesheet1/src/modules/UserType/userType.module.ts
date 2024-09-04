import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeEntity } from './userType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeEntity])],
  controllers: [],
  exports: [],
  providers: [],
})
export class UserTypeModule {}
