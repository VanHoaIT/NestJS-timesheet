import { Global, Module, type Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from './services/app-config.service';
import { TokenService } from './services/token.service';

const providers: Provider[] = [AppConfigService, TokenService, JwtService];

@Global()
@Module({
  providers,
  imports: [ConfigModule.forRoot()], //CqrsModule, JwtModule.register({})
  exports: [...providers], //CqrsModule
})
export class SharedModule {}
