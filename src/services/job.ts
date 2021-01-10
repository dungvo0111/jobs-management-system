import { Types } from 'mongoose'
import Job, { JobDocument } from '../models/Job'

async function createJob(payload: JobDocument): Promise<JobDocument> {
    const {
        name,
        customerId,
        customerName,
        userName,
        location,
        startDate,
        endDate,
        status,
        userIds,
        info,
        messageIds
    } = payload

    const job = new Job({
        name,
        customerId,
        customerName,
        userName,
        location,
        startDate,
        endDate,
        status,
        userIds,
        info,
        messageIds
    })
    return job.save()
}

async function getAllJobs(userId: string): Promise<JobDocument[]> {
    const jobs = await Job.find({ userIds: { $in: userId } }, { 'userIds': 0 })
        .sort({ name: 1 }).exec()

    return jobs
}

async function getJob(id: string): Promise<JobDocument> {
    return Job.findById(id)
        .exec()
        .then((job) => {
            if (!job) {
                throw new Error(`Job with id ${id} not found`)
            }
            return job
        })
}

async function updateJob(
    id: string,
    update: Partial<JobDocument>
): Promise<JobDocument> {
    return getJob(id).then(job => {
        if (!job) {
            throw new Error(`Job with id ${id} not found`)
        }
        if (update.status) {
            job.status = update.status
        }
        if (update.info) {
            job.info = update.info
        }
        if (update.startDate) {
            job.startDate = update.startDate
        }
        if (update.endDate) {
            job.endDate = update.endDate
        }
        if (update.location) {
            job.location = update.location
        }
        if (update.name) {
            job.name = update.name
        }
        if (update.taskIds) {
            job.taskIds = update.taskIds
        }

        return job.save()
    })
}

async function deleteJob(id: string): Promise<JobDocument | null> {
    return Job.findByIdAndDelete(id)
        .exec()
        .then((job) => {
            if (!job) {
                throw new Error(`Job with id ${id} not found`)
            }
            return job
        })
}

export default {
    createJob,
    getAllJobs,
    getJob,
    updateJob,
    deleteJob
}
