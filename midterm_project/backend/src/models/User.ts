import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  username: string;
  password: string;
  role: 'employer' | 'jobseeker';
  skills: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['employer', 'jobseeker'],
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model<IUserDocument>('User', UserSchema);
