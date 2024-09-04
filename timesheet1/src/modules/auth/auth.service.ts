import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppConfigService } from '@src/common/shared/services/app-config.service';
import { TokenService } from '@src/common/shared/services/token.service';
import { AccessTokenPayload } from '@src/common/types/access-token-payload.type';
import AppUtil from '@src/common/utils';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AccessTokenResponse } from './dto/access-token.response';
import { LoginResponse } from './dto/login.response';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private configService: AppConfigService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<LoginResponse> {
    const user = await this.getAuthenticatedUser(userLoginDto);
    return this.generateAuthCredential(user);
  }

  private async generateAuthCredential(
    user: UserEntity,
  ): Promise<LoginResponse> {
    const accessTokenDto = this.generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const accessToken = accessTokenDto.accessToken;
    const refreshToken = this.tokenService.generateRefreshToken({
      accessToken,
    });

    await this.userService.setRefreshToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  generateAccessToken(payload: AccessTokenPayload): AccessTokenResponse {
    const accessToken = this.tokenService.generateAccessToken(payload);

    return {
      expiredIn: this.configService.authConfig.getAccessExpirationTime(),
      accessToken,
    };
  }

  public async getAuthenticatedUser({
    email,
    password: plainPassword,
  }: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await AppUtil.validateHash(
      plainPassword,
      user?.password,
    );

    if (!isValidPassword) {
      throw new ForbiddenException('Invalid password');
    }
    return user;
  }
}
