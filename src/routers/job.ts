import express from 'express'

import { getAllJobs, createJob, updateJob, deleteJob, getJob } from '../controllers/job'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.get('/', checkAuth, getAllJobs)
router.get('/:id', checkAuth, getJob)
router.post('/', checkAuth, createJob)
router.put('/:id', checkAuth, updateJob)
router.delete('/:id', checkAuth, deleteJob)

export default router
