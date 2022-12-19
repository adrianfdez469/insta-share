/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {

  const rmqUser = process.env.RABBITMQ_DEFAULT_USER;
  const rmqPass = process.env.RABBITMQ_DEFAULT_PASS;
  const rmqDomain = process.env.RABBITMQ_DOMAIN;
  const rmqPort = process.env.RABBITMQ_PORT;
  const rmqVHost = process.env.RABBITMQ_DEFAULT_VHOST;
  
  const rmqConnString = `amqp://${rmqUser}:${rmqPass}@${rmqDomain}:${rmqPort}/${rmqVHost}`;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rmqConnString],
      queue: process.env.RABBITMQ_MAIN_QUEUE_NAME || 'main_queue',
      queueOptions: {
        durable: false
      }
    }
  });
  await app.listen().then(() => Logger.log(`🚀 Microservice is listening`));
}

bootstrap();
