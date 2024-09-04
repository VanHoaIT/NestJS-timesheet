import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  type NestExpressApplication,
} from '@nestjs/platform-express';

import { Logger } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import bootstrapConfig from './common/configs/boostrap-config';

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  await bootstrapConfig(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  const url = await app.getUrl();
  Logger.log(`Server running on ${url}`);
  return app;
}

void bootstrap();
