import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../libs/database/database.module";
import { FilesModule } from "../files/files.module";
import { usersProviders } from "./users.providers";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [FilesModule, DatabaseModule],
  providers: [UsersService, UsersResolver, ...usersProviders]
})
export class UsersModule {}