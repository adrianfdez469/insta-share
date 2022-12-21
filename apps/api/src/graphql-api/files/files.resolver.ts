import { Resolver, Mutation, Args, ResolveField, Parent, Subscription } from "@nestjs/graphql";
import { FilesService } from "./files.service";
import { Query } from "@nestjs/graphql";
import { DeleteFileResponse, File } from "@cuban-eng/common";
import { PubSub } from 'graphql-subscriptions';
import { Inject } from "@nestjs/common";
import { PUB_SUB } from "../../constants";


@Resolver('File')
export class FilesResolver {
  
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private filesService: FilesService) { }

  @Query()
  async getFiles(@Args('user') userId) {
    const files = await this.filesService.findAll(userId);
    return files;
  }

  @Mutation()
  async deleteFile(@Args('id') id: string): Promise<DeleteFileResponse> {
    try {
      const fileDeleted = await this.filesService.deleteFile(id);
      if(fileDeleted){
        return { code: '200', message: 'FILE DELETED', success: true }  
      } else {
        return { code: '404', message: 'FILE NOT FOUND', success: false }  
      }
    } catch (error) {
      return { code: '500', message: 'ERROR', success: false }  
    }
  }

  @Mutation()
  async deleteAllFiles(): Promise<DeleteFileResponse> {
    try {
      await this.filesService.deleteAllFile();
      return { code: '200', message: 'FILES DELETED', success: true }  
    } catch (error) {
      return { code: '500', message: 'ERROR', success: false }  
    }
  }

  @Subscription(
    (returns) => File,
    {
      filter(payload, variables, context) {
        return payload.fileChanged.user.toString() === variables.userId.toString()
      },
    }
  )
  fileChanged() {
    return this.pubSub.asyncIterator('fileChanged');
  }
  

}