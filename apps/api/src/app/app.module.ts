import { join } from 'path';
import { Module } from '@nestjs/common';
//import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
//import { AppController } from './app.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/api/src/app/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true
      }
    }),
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
