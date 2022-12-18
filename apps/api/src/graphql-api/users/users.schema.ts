import * as mongoose from 'mongoose';
import { FileSchema } from '../files/files.schema'

export const UserSchema = new mongoose.Schema({
  email: String,
  password: { type: String, select: false },
  files: [FileSchema]
});