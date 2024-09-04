/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AccessTokenPayload } from '@src/common/types/access-token-payload.type';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/common/shared/services/app-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @ts-expect-error
    private configService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.accessTokenSecret,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AccessTokenPayload> {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
