import { Request, Response, NextFunction } from 'express'

import MessageService from '../services/message'
import {
    BadRequestError,
    InternalServerError,
} from '../helpers/apiError'

//GET /messages/:jobId
export const getAllMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await MessageService.getAllMessages(req.params.jobId))
    } catch (error) {
        throw new InternalServerError()
    }
}

//POST /messages
export const createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await MessageService.createMessage(req.body))
    } catch (error) {
        if (error.statusCode === 500) {
            next(new InternalServerError('Internal Server Error', error))
        } else {
            next(new BadRequestError(error.message, error))
        }
    }
}

