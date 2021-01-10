import mongoose, { Document } from 'mongoose'

export type Status = 'Pending' | 'Ongoing' | 'Closed'

export type JobDocument = Document & {
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  status: Status;
  info: string;
  customerId: string;
  customerName: string;
  userIds: string[];
  userName: string;
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
  customerId: {
    type: String,
  },
  customerName: {
    type: String,
    required: true,
  },
  userIds: {
    type: [String],
  },
  userName: {
    type: String,
    required: true,
  },
  messageIds: {
    type: [String],
  },
  taskIds: {
    type: [String],
  },
})

export default mongoose.model<JobDocument>('Job', jobSchema)
