import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { RMQ_PATTERNS } from '@cuban-eng/common'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern(RMQ_PATTERNS.RMQ_PATTERN_FILE_SAVED)
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log('Recibe message');
    console.log(data);

    const file = await this.appService.getFile()
    const compressedFile = await this.appService.compressFile(file);
    await this.appService.saveFile(compressedFile);

    
    
  }
}
