import { Resolver, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { FilesService } from "./files.service";
import { Query } from "@nestjs/graphql";
import { DeleteFileResponse } from "../graphql";



@Resolver('File')
export class FilesResolver {
  
  constructor(private filesService: FilesService) {}

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
  

}