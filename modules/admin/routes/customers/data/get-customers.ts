'use server'

import prismadb from '@/lib/prismadb'
import { Customer } from '@prisma/client'

const customerE: Customer[] = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Perez',
    dni: '12345678',
    email: 'juan@mail.com',
    password: '123456',
    city: 'Lima',
    phoneNumber: '123456789',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const customers = await prismadb.customer.findMany()

    return customers.length ? customers : customerE
  } catch (error) {
    console.log('[CUSTOMERS_GET]', error)
  }

  return []
}
