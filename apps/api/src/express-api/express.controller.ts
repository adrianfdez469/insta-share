import { Controller, Get,  UseInterceptors, Post, UploadedFile, Body, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';

import { Express } from 'express';
// This is a hack to make Multer available in the Express namespace
import { Multer } from 'multer';
import { RMQ_SERVICE_NAME, RMQ_PATTERNS } from '@cuban-eng/common'
import { ExpressService } from './express.service'

type File = Express.Multer.File;

@Controller()
export class ExpressController {

  constructor(
    @Inject(RMQ_SERVICE_NAME) private readonly client: ClientProxy,
    private readonly service: ExpressService,
  ) { }
  

  

  @Get()
  getData() {
    return this.service.getData()
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() params,
    @UploadedFile(
    /*new ParseFilePipeBuilder()
      .addMaxSizeValidator({ maxSize: 15000000 })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })*/
  ) file: File) {
    console.log(params);
    

    const data = await this.service.upload(file);

    
    this.client.emit<any>(RMQ_PATTERNS.RMQ_PATTERN_FILE_SAVED, {
      userId: params.user,
      name: file.originalname
    });

    return data;
  }
}