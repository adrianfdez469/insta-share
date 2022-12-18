import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  name: String,
  status: String,
  size: Number,
  url: String
});