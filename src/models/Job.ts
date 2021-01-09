import mongoose, { Document } from 'mongoose'

export type Status = 'Pending' | 'Ongoing' | 'Closed'

export type JobDocument = Document & {
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  status: Status;
  info: string;
  userIds: string[];
  messageIds: string[];
  taskIds: string[];
}

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Pending', 'Closed'],
    default: 'available',
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  userIds: {
    type: [String],
  },
  messageIds: {
    type: [String],
  },
  taskIds: {
    type: [String],
  },
})

export default mongoose.model<JobDocument>('Job', jobSchema)
