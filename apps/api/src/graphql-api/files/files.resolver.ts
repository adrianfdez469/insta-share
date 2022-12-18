import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { FilesService } from "./files.service";



@Resolver()
export class FilesResolver {
  
  constructor(private filesService: FilesService) {}

  

}