import mongoose, { Schema, Document } from 'mongoose';

export interface IMessageDocument extends Document {
  applicationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessageDocument>({
  applicationId: {
    type: Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Message = mongoose.model<IMessageDocument>('Message', MessageSchema);
