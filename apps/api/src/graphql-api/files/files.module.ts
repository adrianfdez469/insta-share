import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { DatabaseModule } from "../../libs/database/database.module";
import { filesProviders } from "./files.providers";
import { FilesResolver } from "./files.resolver";
import { FilesController } from "./files.controller";

@Module({

  imports: [FilesModule, DatabaseModule],
  providers: [FilesService, FilesResolver, ...filesProviders],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}