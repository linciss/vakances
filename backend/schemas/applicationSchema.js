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
  education: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  address: {
    type: String,
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
