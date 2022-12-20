import { Connection } from 'mongoose';
import { FileSchema } from './files.schema';
import { DATABASE_CONNECTION, FILE_MODEL } from '../../constants';

export const filesProviders = [
  {
    provide: FILE_MODEL,
    useFactory: (connection: Connection) => connection.model('File', FileSchema),
    inject: [DATABASE_CONNECTION],
  },
];