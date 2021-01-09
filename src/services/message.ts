import Message, { MessageDocument } from '../models/Message'

async function getAllMessages(jobId: string): Promise<MessageDocument[]> {
    const messages = await Message.find({ jobId: { $eq: jobId } })
        .sort({ createdAt: -1 }).exec()

    return messages
}

function createMessage(payload: MessageDocument): Promise<MessageDocument> {
    const {
        text,
        jobId
    } = payload

    const message = new Message({
        text,
        jobId
    })
    return message.save()
}

export default {
    getAllMessages,
    createMessage,
}
