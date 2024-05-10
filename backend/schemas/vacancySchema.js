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
});

export const Vacancy = mongoose.model('Vacancy', vacancySchema, 'vacancies');
