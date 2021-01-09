import express from 'express'

import { signUp, signIn } from '../controllers/user'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.post('/', signUp)
router.post('/signIn', signIn)

export default router
