import { Module } from "@nestjs/common";
import { GraphqlModule } from "./graphql-api/graphql.module";
import { ExpressModule } from './express-api/express.module';

@Module({
  imports: [
    ExpressModule,
    GraphqlModule
  ]
})
export class AppModule {}