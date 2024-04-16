import mongoose, { Schema } from 'mongoose';

const newsSchema = new Schema({
  author: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  source: {
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: false,
  },
});

export const News = mongoose.model('News', newsSchema, 'news');
