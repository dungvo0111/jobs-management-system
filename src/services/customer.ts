import { Types } from 'mongoose'
import Customer, { CustomerDocument } from '../models/Customer'

async function getAllCustomers(): Promise<CustomerDocument[]> {
    const customers = await Customer.find({}, { 'jobIds': 0 })
        .sort({ firstName: 1 }).exec()

    return customers
}

function createCustomer(payload: CustomerDocument): Promise<CustomerDocument> {
    const {
        firstName,
        lastName,
        email,
        location
    } = payload

    const customer = new Customer({
        firstName,
        lastName,
        email,
        location
    })
    return customer.save()
}

async function deleteCustomer(id: string): Promise<CustomerDocument | null> {
    return Customer.findByIdAndDelete(id)
        .exec()
        .then((customer) => {
            if (!customer) {
                throw new Error(`Customer with id ${id} not found`)
            }
            return customer
        })
}

export default {
    getAllCustomers,
    createCustomer,
    deleteCustomer
}
