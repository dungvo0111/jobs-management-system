import { MessageDocument } from '../models/Message'
import Task, { TaskDocument } from '../models/Task'

type updateTaskPayload = {
    messages?: MessageDocument[]
    dueDate?: Date
}

async function createTask(jobId: string, payload: TaskDocument): Promise<TaskDocument> {
    const {
        dueDate,
        messages
    } = payload

    const task = new Task({
        dueDate,
        jobId,
        messages
    })
    return task.save()
}

async function getAllTasks(jobId: string): Promise<TaskDocument[]> {
    const tasks = await Task.find({ jobId: { $eq: jobId } })
        .sort({ createdAt: 1 }).exec()

    return tasks
}

async function getTask(taskId: string): Promise<TaskDocument> {
    return Task.findById(taskId).exec()
        .then((task) => {
            if (!task) {
                throw new Error(`Task with id ${taskId} not found`)
            }
            return task
        })

}

async function updateTask(taskId: string, payload: updateTaskPayload): Promise<TaskDocument> {
    return getTask(taskId).then(task => {
        if (!task) {
            throw new Error(`Task with id ${taskId} not found`)
        }
        if (payload.dueDate) {
            task.dueDate = payload.dueDate
        }
        if (payload.messages) {
            task.messages = [...payload.messages]
        }

        return task.save()
    })
}

async function deleteTask(taskId: string): Promise<TaskDocument | null> {
    return Task.findByIdAndDelete(taskId)
        .exec()
        .then((task) => {
            if (!task) {
                throw new Error(`Task with id ${taskId} not found`)
            }
            return task
        })
}

export default {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}
