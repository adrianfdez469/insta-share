import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { RMQ_PATTERNS } from '@cuban-eng/common'

@Controller()
export class AppController {
  constructor(
    @Inject('API_EMITTER') private readonly app_emitter: ClientProxy,
    private readonly appService: AppService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern(RMQ_PATTERNS.RMQ_PATTERN_FILE_UPLOADED)
  async handleFileUploaded(data: {userId: string, name: string}) {
    Logger.log(`🛬 FROM COMPRESSOR RECEIVING FILE_UPLOADED EVENT`)

    Logger.log(`🛫 FROM COMPRESSOR EMITTING FILE_COMPRESSING EVENT`)
    this.app_emitter.emit<any>(RMQ_PATTERNS.RMQ_PATTERN_FILE_COMPRESSING, {
      userId: data.userId,
      uniquename: data.name,
    });
    
    const {name, size} = await this.appService.compressFile(`uploads`, `public`, data.name as string);

    Logger.log(`🛫 FROM COMPRESSOR EMITTING FILE_COMPRESSED_SAVED EVENT`)
    this.app_emitter.emit<any>(RMQ_PATTERNS.RMQ_PATTERN_FILE_COMPRESSED_SAVED, {
      userId: data.userId,
      old_uniquename: data.name,
      new_compressed_name: name,
      new_size: size
    });
  }
}
