import { Request, Response, NextFunction } from 'express'

import Job, { JobDocument } from '../models/Job'
import JobService from '../services/job'
import {
    NotFoundError,
    BadRequestError,
    InternalServerError,
} from '../helpers/apiError'

//GET /jobs 
export const getAllJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await JobService.getAllJobs(req.body.authData.userId))
    } catch (error) {
        throw new InternalServerError()
    }
}

// GET /jobs/:id
export const getJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await JobService.getJob(req.params.id))
    } catch (error) {
        if (error.statusCode === 400) {
            next(new BadRequestError(error.message, error))
        } else {
            next(new NotFoundError(error.message, error))
        }
    }
}

//POST /jobs
export const createJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const job = await JobService.createJob(req.body)
        res.json({
            message: 'New job added successfully!',
            job,
        })
    } catch (error) {
        if (error.statusCode === 500) {
            next(new InternalServerError('Internal Server Error', error))
        } else {
            next(new BadRequestError(error.message, error))
        }
    }
}

// PUT /jobs/:id
export const updateJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updates = req.body
        const id = req.params.id
        const updatedJob = await JobService.updateJob(id, updates)
        res.json({
            message: 'Job updated successfully!',
            updatedJob,
        })
    } catch (error) {
        if (error.statusCode === 400) {
            next(new BadRequestError(error.message, error))
        } else {
            next(new NotFoundError(error.message, error))
        }
    }
}

// DELETE /jobs/:id
export const deleteJob = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await JobService.deleteJob(req.params.id)
        res.json({ message: 'Job deleted successfully' })
    } catch (error) {
        if (error.statusCode === 400) {
            next(new BadRequestError(error.message, error))
        } else {
            next(new NotFoundError(error.message, error))
        }
    }
}


