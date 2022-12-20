/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { bootstrapMicro } from './micro-main'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.API_PORT || 3333;
  app.enableCors();
  await app.listen(port);

  Logger.log(
    `🚀 Express application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `🚀 Graphql application is running on: http://localhost:${port}/graphql`
  );

}

bootstrap();
bootstrapMicro()
