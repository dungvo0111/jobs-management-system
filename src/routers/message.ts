import express from 'express'

import { createMessage, getAllMessages } from '../controllers/message'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.get('/:jobId', checkAuth, getAllMessages)
router.post('/', checkAuth, createMessage)

export default router
