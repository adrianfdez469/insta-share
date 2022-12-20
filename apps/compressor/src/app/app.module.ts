import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_CONNECTION_STRING, RMW_QUEUES } from '@cuban-eng/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'API_EMITTER',
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
