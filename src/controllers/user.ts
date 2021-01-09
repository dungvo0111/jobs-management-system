import { Request, Response, NextFunction } from 'express'

import UserService from '../services/user'
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'

//POST /user
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    const user = await UserService.signUp(req.body)
    res.json({
      message: 'Sign up successful!',
      user,
    })
  } catch (error) {
    if (error.statusCode === 500) {
      next(new InternalServerError('Internal Server Error', error))
    } else {
      next(new BadRequestError(error.message, error))
    }
  }
}

//POST /user/signIn
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await UserService.signIn(req.body)
    res.json({
      message: 'Sign in successful!',
      token: token,
    })
  } catch (error) {
    if (error.statusCode === 401) {
      next(new UnauthorizedError(error.message, error))
    } else {
      next(new BadRequestError(error.message, error))
    }
  }
}
