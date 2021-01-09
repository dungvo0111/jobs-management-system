import mongoose, { Document } from 'mongoose'

export type Status = 'Pending' | 'Ongoing' | 'Closed'

export type MessageDocument = Document & {
  text: string;
}

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
})

export default mongoose.model<MessageDocument>('Message', messageSchema)
