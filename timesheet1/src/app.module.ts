import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { UserSubscriber } from './common/entity-subscribers/user-subscriber';
import { SharedModule } from './common/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, SharedModule, UserModule, AuthModule],
  controllers: [],
  providers: [UserSubscriber],
})
export class AppModule {}
