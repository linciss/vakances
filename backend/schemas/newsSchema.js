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

  publishedAt:{
    type: Date,
    default: Date.now,
  },


});

export const News = mongoose.model('News', newsSchema, 'news');
