import { Controller, Get,  UseInterceptors, Post, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Express } from 'express';
// This is a hack to make Multer available in the Express namespace
import { Multer } from 'multer';

import { ExpressService } from './express.service'

type File = Express.Multer.File;

@Controller()
export class ExpressController {

  constructor(
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

    

    return data;
  }
}