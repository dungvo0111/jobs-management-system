import { Request, Response, NextFunction } from 'express'

import CustomerService from '../services/customer'
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} from '../helpers/apiError'

//GET /customers
export const getAllCustomers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json(await CustomerService.getAllCustomers())
    } catch (error) {
        throw new InternalServerError()
    }
}

//POST /customers
export const createCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const customer = await CustomerService.createCustomer(req.body)
        res.json({
            message: 'Create new customer successful!',
            customer,
        })
    } catch (error) {
        if (error.statusCode === 500) {
            next(new InternalServerError('Internal Server Error', error))
        } else {
            next(new BadRequestError(error.message, error))
        }
    }
}

// DELETE /customers/:id
export const deleteCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await CustomerService.deleteCustomer(req.params.id)
        res.json({ message: 'Customer deleted successfully' })
    } catch (error) {
        if (error.statusCode === 400) {
            next(new BadRequestError(error.message, error))
        } else {
            next(new NotFoundError(error.message, error))
        }
    }
}
