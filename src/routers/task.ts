import express from 'express'

import { getAllTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/task'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.get('/', checkAuth, getAllTasks)
router.get('/:taskId', checkAuth, getTask)
router.post('/', checkAuth, createTask)
router.put('/:taskId', checkAuth, updateTask)
router.delete('/:taskId', checkAuth, deleteTask)

export default router
