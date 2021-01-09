import express from 'express'

import { createCustomer, deleteCustomer, getAllCustomers } from '../controllers/customer'

import checkAuth from '../middlewares/checkAuth'

const router = express.Router()

router.get('/', checkAuth, getAllCustomers)
router.post('/', checkAuth, createCustomer)
router.delete('/:id', checkAuth, deleteCustomer)

export default router
