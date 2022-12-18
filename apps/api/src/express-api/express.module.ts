import { Module } from '@nestjs/common';
import { ExpressController } from './express.controller';
import { ExpressService } from './express.service';

@Module({
  controllers: [ExpressController],
  providers: [ExpressService],

})
export class ExpressModule {}

