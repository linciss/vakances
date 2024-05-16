import { Timestamp } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const vacancySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  load: {
    type: String,
    required: false,
  },
  workTime: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  workType: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
  timeEdited: {
    type: Date,
    default: Date.now,
  },
});

vacancySchema.pre('save', function (next) {
  this.timeEdited = Date.now();
  next();
});

export const Vacancy = mongoose.model('Vacancy', vacancySchema, 'vacancies');
