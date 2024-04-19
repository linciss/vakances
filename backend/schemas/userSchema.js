import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
  UUID: {
    type: String,
    required: false,
    unique: true,
  },
});

//generates UUID for user
userSchema.pre('save', function (next) {
  if (!this.UUID) {
    this.UUID = uuidv4();
  }
  next();
});

export const User = mongoose.model('User', userSchema, 'users');
