/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RMQ_CONNECTION_STRING, RMW_QUEUES } from '@cuban-eng/common';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_CONNECTION_STRING],
      queue: RMW_QUEUES.COMPRESSOR_QUEUE,
      queueOptions: {
        durable: false
      }
    }
  });
  await app.listen().then(() => Logger.log(`🚀 Microservice is listening`));
}

bootstrap();
