import User, { UserDocument } from '../models/User'
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../helpers/apiError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

type signInPayload = {
  email: string
  password: string
}

const isEmail = (email: string) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true
  else return false
}

const isPassword = (password: string) => {
  const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (password.match(regEx)) return true
  else return false
}

function signUp(payload: UserDocument): Promise<UserDocument> {
  if (!isEmail(payload.email)) {
    throw new Error('Must be a valid email address')
  }
  if (!isPassword(payload.password)) {
    throw new Error(
      'Password must be from eight characters, at least one letter and one number'
    )
  }
  return User.find({ email: payload.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error('Email has already registered')
      } else {
        return bcrypt
          .hash(payload.password, 10)
          .then((hash) => {
            const user = new User({
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
              password: hash,
            })
            return user.save()
          })
          .catch((err) => {
            throw new InternalServerError()
          })
      }
    })
}

function signIn(payload: signInPayload): Promise<string> {
  if (!isEmail(payload.email)) {
    throw new Error('Must be a valid email address')
  }
  if (!isPassword(payload.password)) {
    throw new Error(
      'Password must be from eight characters, at least one letter and one number'
    )
  }
  return User.findOne({ email: payload.email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Email has not been registered')
      }
      return bcrypt.compare(payload.password, user.password).then((res) => {
        if (res) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
            },
            JWT_SECRET,
            {
              expiresIn: '1h',
            }
          )
          return token
        } else {
          throw new UnauthorizedError('Password does not match')
        }
      })
    })
}

async function getAllUsers(): Promise<UserDocument[]> {
  const users = await User.find({}, { 'lastName': 1, 'firstName': 1, 'email': 1 })
    .sort({ firstName: 1 }).exec()

  return users
}

export default {
  signUp,
  signIn,
  getAllUsers
}
