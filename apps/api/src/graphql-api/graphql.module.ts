import { join } from 'path';
import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    UsersModule,
    FilesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/api/src/graphql-api/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true
      }
    }),
  ],
})
export class GraphqlModule {}
