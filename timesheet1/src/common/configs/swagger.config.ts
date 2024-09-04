import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Timesheet API Sepcification')
    .setDescription('Documentation for Timesheet API')
    .setVersion('0.1')
    .addBearerAuth();
  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('doc', app, document);
};
