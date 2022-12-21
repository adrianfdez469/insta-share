import { Connection } from 'mongoose';
import { FileSchema } from './files.schema';
import { DATABASE_CONNECTION, FILE_MODEL, PUB_SUB } from '../../constants';
import { PubSub } from 'graphql-subscriptions'

export const filesProviders = [
  {
    provide: FILE_MODEL,
    useFactory: (connection: Connection) => connection.model('File', FileSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: PUB_SUB,
    useValue: new PubSub(),
  }
];