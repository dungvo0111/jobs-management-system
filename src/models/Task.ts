import mongoose, { Document } from 'mongoose'

export type TaskDocument = Document & {
  dueDate: Date;
  jobId: string;
  messageIds: string[];
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
  messageIds: {
    type: [String],
  },
})

export default mongoose.model<TaskDocument>('Task', taskSchema)
