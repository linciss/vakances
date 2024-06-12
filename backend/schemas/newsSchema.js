import mongoose, { Schema } from 'mongoose';

const newsSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },


});

export const News = mongoose.model('News', newsSchema, 'news');
