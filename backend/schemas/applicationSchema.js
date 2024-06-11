import mongoose, { Schema } from 'mongoose';

const aplicationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cvId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
  vacancyId: {
    type: String,
    required: true,
  },
  vacancyName: {
    type: String,
    required: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
});

export const Application = mongoose.model(
  'Application',
  aplicationSchema,
  'applications'
);
