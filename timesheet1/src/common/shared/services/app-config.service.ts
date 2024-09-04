import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserSubscriber } from '@src/common/entity-subscribers/user-subscriber';
import { isNil } from 'lodash';
import ms from 'ms';
import entities from 'src/common/database/entity';
import { SnakeNamingStrategy } from 'src/common/database/snake-naming.strategy';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get postgresConfig(): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: !this.isTest,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      subscribers: [UserSubscriber],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: false,
      entities,
    };
  }

  get authConfig() {
    return {
      accessTokenSecret: this.getString('JWT_ACCESS_TOKEN_SECRET'),
      refreshTokenSecret: this.getString('JWT_REFRESH_TOKEN_SECRET'),
      recoveryTokenSecret: this.getString('JWT_RECOVERY_TOKEN_SECRET'),
      getAccessExpirationTime: (date = new Date()): number =>
        date.getTime() + ms(this.getString('JWT_EXPIRATION_TIME')),
      getRefreshExpirationTime: (date = new Date()): number =>
        date.getTime() + ms(this.getString('JWT_REFRESH_EXPIRATION_TIME')),
      getRecoveryExpirationTime: (date = new Date()): number =>
        date.getTime() + ms(this.getString('JWT_RECOVERY_EXPIRATION_TIME')),
      jwtExpirationTime: this.getString('JWT_EXPIRATION_TIME'),
      jwtRefreshExpirationTime: this.getString('JWT_REFRESH_EXPIRATION_TIME'),
      jwtRecoveryExpirationTime: this.getString('JWT_RECOVERY_EXPIRATION_TIME'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }
}
