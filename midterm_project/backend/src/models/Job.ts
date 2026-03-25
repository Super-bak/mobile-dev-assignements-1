import mongoose, { Schema, Document } from 'mongoose';

export interface IJobDocument extends Document {
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  employerId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const JobSchema = new Schema<IJobDocument>({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true,
    default: []
  },
  employerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Job = mongoose.model<IJobDocument>('Job', JobSchema);
