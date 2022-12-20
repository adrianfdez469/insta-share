import { Controller, Get,  UseInterceptors, Post, UploadedFile, Body, Inject, UploadedFiles, Logger } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

import { Express } from 'express';
// This is a hack to make Multer available in the Express namespace
import { Multer, diskStorage } from 'multer';

import { RMQ_PATTERNS } from '@cuban-eng/common'


type File = Express.Multer.File;

@Controller()
export class ExpressController {

  constructor(
    @Inject('COMPRESSOR_EMMITER') private readonly compressor_emitter: ClientProxy,
    @Inject('API_EMMITER') private readonly api_emitter: ClientProxy
  ) { }
  
  // TODO: allow only if authentication token is ok
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads')
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, uniqueSuffix + '-' + file.originalname.split(' ').join('_'))
        }
      })
    })
  )
  async uploadFile(
    @Body() params,
    @UploadedFile() file: File) {
    const { user } = params;
    
    Logger.log(`🛫 FROM EXPRESS EMITTING FILE_UPLOADED EVENT`);
    // Emitting event to compressor microservice
    this.compressor_emitter.emit<any>(RMQ_PATTERNS.RMQ_PATTERN_FILE_UPLOADED, {
      userId: user,
      name: file.filename,
      size: file.size,
      originalname: file.originalname,
      savePath: 'uploads',
    });

    // Emitting event to api microservice
    this.api_emitter.emit<any>(RMQ_PATTERNS.RMQ_PATTERN_FILE_UPLOADED, {
      userId: user,
      name: file.filename,
      size: file.size,
      originalname: file.originalname,
      savePath: 'uploads',
    });

    
  }
}