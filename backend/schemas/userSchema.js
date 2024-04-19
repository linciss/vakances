import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'moderator',
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema, 'users');
