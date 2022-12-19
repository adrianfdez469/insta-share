import { Module } from '@nestjs/common';
import { ExpressController } from './express.controller';
import { ExpressService } from './express.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { RMQ_SERVICE_NAME } from '@cuban-eng/common';

  const rmqUser = process.env.RABBITMQ_DEFAULT_USER;
  const rmqPass = process.env.RABBITMQ_DEFAULT_PASS;
  const rmqDomain = process.env.RABBITMQ_DOMAIN;
  const rmqPort = process.env.RABBITMQ_PORT;
  const rmqVHost = process.env.RABBITMQ_DEFAULT_VHOST;
  
  const rmqConnString = `amqp://${rmqUser}:${rmqPass}@${rmqDomain}:${rmqPort}/${rmqVHost}`;
@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [rmqConnString],
          queue: process.env.RABBITMQ_MAIN_QUEUE_NAME || 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ExpressController],
  providers: [ExpressService],

})
export class ExpressModule {}

