import { Module } from '@nestjs/common';
import { ExpressController } from './express.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { RMQ_CONNECTION_STRING, RMW_QUEUES } from '@cuban-eng/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMPRESSOR_EMMITER',
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_CONNECTION_STRING],
          queue: RMW_QUEUES.COMPRESSOR_QUEUE,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'API_EMMITER',
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_CONNECTION_STRING],
          queue: RMW_QUEUES.API_QUEUE,
          queueOptions: {
            durable: false
          },
        },
      },
    ])
  ],
  controllers: [ExpressController],
})
export class ExpressModule {}

