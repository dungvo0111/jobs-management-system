import mongoose, { Document } from 'mongoose'
import { MessageDocument } from './Message'

export type TaskDocument = Document & {
  dueDate: Date;
  jobId: string;
  messages: MessageDocument[]
}

const taskSchema = new mongoose.Schema({
  dueDate: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  messages: {
    type: [Object],
  }
}, { timestamps: true })

export default mongoose.model<TaskDocument>('Task', taskSchema)
