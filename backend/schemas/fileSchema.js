import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true },
  uploadDate: { type: Date, default: Date.now },
  size: { type: String, required: true },
});

export const File = mongoose.model('File', fileSchema, 'files');
