import express from 'express'

import { signUp, signIn, getAllUsers } from '../controllers/user'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.post('/', signUp)
router.post('/signIn', signIn)
router.get('/', checkAuth, getAllUsers)

export default router
