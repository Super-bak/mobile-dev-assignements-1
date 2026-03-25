import mongoose, { Schema, Document } from 'mongoose';

export interface IApplicationDocument extends Document {
  jobId: mongoose.Types.ObjectId;
  jobseekerId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplicationDocument>({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobseekerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Application = mongoose.model<IApplicationDocument>('Application', ApplicationSchema);
