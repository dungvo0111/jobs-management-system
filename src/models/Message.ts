import mongoose, { Document } from 'mongoose'

export type Status = 'Pending' | 'Ongoing' | 'Closed'

export type MessageDocument = Document & {
  text: string;
  jobId: string;
  taskId: string;
}

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  taskId: {
    type: String,
  },
}, { timestamps: true })

export default mongoose.model<MessageDocument>('Message', messageSchema)
