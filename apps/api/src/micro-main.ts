
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { RMQ_CONNECTION_STRING, RMW_QUEUES } from '@cuban-eng/common';

export async function bootstrapMicro() {


  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_CONNECTION_STRING],
      queue: RMW_QUEUES.API_QUEUE,
      queueOptions: {
        durable: false
      }
    }
  });
  await app.listen().then(() => Logger.log(`🚀 Microservice (Micro-Main) is listening`));
}

