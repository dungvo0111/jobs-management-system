import { Request, Response, NextFunction } from 'express'

import TaskService from '../services/task'
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
} from '../helpers/apiError'

//GET /tasks
export const getAllTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await TaskService.getAllTasks(req.query.jobId))
    } catch (error) {
        throw new InternalServerError()
    }
}

//GET /tasks/:taskId
export const getTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await TaskService.getTask(req.params.taskId))
    } catch (error) {
        throw new InternalServerError()
    }
}

//POST /tasks
export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await TaskService.createTask(req.query.jobId, req.body))
    } catch (error) {
        if (error.statusCode === 500) {
            next(new InternalServerError('Internal Server Error', error))
        } else {
            next(new BadRequestError(error.message, error))
        }
    }
}

// PUT /tasks/:taskId
export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updatedJob = await TaskService.updateTask(req.params.taskId, req.body)
        res.json({
            message: 'Task updated successfully!',
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

// DELETE /tasks/:taskId
export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const taskId = req.params.taskId
        await TaskService.deleteTask(taskId)
        res.json({ message: 'Task deleted successfully' })
    } catch (error) {
        if (error.statusCode === 400) {
            next(new BadRequestError(error.message, error))
        } else {
            next(new NotFoundError(error.message, error))
        }
    }
}

