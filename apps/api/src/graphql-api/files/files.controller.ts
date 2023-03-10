import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';


import { RMQ_PATTERNS, FILE_STATUS } from '@cuban-eng/common'
import { FilesService } from './files.service';
import { PubSub } from 'graphql-subscriptions'
import { PUB_SUB } from '../../constants';

@Controller()
export class FilesController {

  
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private readonly filesService: FilesService) { }
  
  @EventPattern(RMQ_PATTERNS.RMQ_PATTERN_FILE_UPLOADED)
  async handleFileCompressedUpload(data: {userId: string, name: string, size: number, originalname: string, savePath: string}) {

    Logger.log(`🛬 FROM FILES CONTROLLER RECEIVING FILE_UPLOADED EVENT`)
    const file = await this.filesService.saveFile(data.originalname, FILE_STATUS.UPLOADED, data.size, data.name, data.userId );
    
    this.pubSub.publish('fileChanged', { fileChanged: file });
  }
  
  @EventPattern(RMQ_PATTERNS.RMQ_PATTERN_FILE_COMPRESSING)
  async handleFileCompressing(data: {uniquename: string}) {


    Logger.log(`🛬 FROM FILES CONTROLLER RECEIVING FILE_COMPRESSING EVENT`)
    const file = await this.filesService.updateByUrl(data.uniquename, {status: FILE_STATUS.COMPRESSING});
    this.pubSub.publish('fileChanged', { fileChanged: file });
  }
  
  @EventPattern(RMQ_PATTERNS.RMQ_PATTERN_FILE_COMPRESSED_SAVED)
  async handleFileCompressedSaved(data: {userId: string, old_uniquename: string, new_compressed_name: string, new_size: number}) {


    Logger.log(`🛬 FROM FILES CONTROLLER RECEIVING FILE_COMPRESSED_SAVED EVENT`)
    const file = await this.filesService.updateByUrl(data.old_uniquename as string, {status: FILE_STATUS.COMPRESSED, zipped_size: Number(data.new_size), url: data.new_compressed_name as string});
    this.pubSub.publish('fileChanged', { fileChanged: file });
  }
}