import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  name: String,
  status: String,
  size: Number,
  zipped_size: Number,
  url: String,
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});