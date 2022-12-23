import { Resolver, Mutation, Args, Subscription } from "@nestjs/graphql";
import { FilesService } from "./files.service";
import { Query } from "@nestjs/graphql";
import { DeleteFileResponse, File, UpdateFileResponse, } from "@cuban-eng/common";
import { PubSub } from 'graphql-subscriptions';
import { Inject, UseGuards } from "@nestjs/common";
import { PUB_SUB } from "../../constants";
import { AuthGuardGraphQl } from "../../libs/auht/auth.guard";


@Resolver('File')
export class FilesResolver {
  
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private filesService: FilesService) { }

  @UseGuards(AuthGuardGraphQl)
  @Query()
  async getFiles(@Args('user') userId) {
    const files = await this.filesService.findAll(userId);
    return files;
  }

  @UseGuards(AuthGuardGraphQl)
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

  @UseGuards(AuthGuardGraphQl)
  @Mutation()
  async deleteAllFiles(): Promise<DeleteFileResponse> {
    try {
      await this.filesService.deleteAllFile();
      return { code: '200', message: 'FILES DELETED', success: true }  
    } catch (error) {
      return { code: '500', message: 'ERROR', success: false }  
    }
  }
  
  @UseGuards(AuthGuardGraphQl)
  @Mutation()
  async updateFile(@Args('id') id: string, @Args('name') name: string): Promise<UpdateFileResponse> {
    try {
      const file = await this.filesService.update(id, {name: name});
      return { code: '200', message: 'FILES DELETED', success: true, data: file as File }  
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