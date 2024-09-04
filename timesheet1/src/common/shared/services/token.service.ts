import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from '@src/common/types/access-token-payload.type';
import { RefreshTokenPayload } from '@src/common/types/refresh-token-payload.type';
import { AppConfigService } from './app-config.service';

@Injectable()
export class TokenService {
  constructor(
    private configService: AppConfigService,
    private jwtService: JwtService,
  ) {}

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.authConfig.accessTokenSecret,
      expiresIn: this.configService.authConfig.jwtExpirationTime,
    });
  }

  generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.authConfig.refreshTokenSecret,
      expiresIn: this.configService.authConfig.jwtRefreshExpirationTime,
    });
  }
}
