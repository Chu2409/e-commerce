'use server'

import prismadb from '@/lib/prismadb'
import { Customer } from '@prisma/client'

export interface CreateCustomerProps {
  dni: string
  firstName: string
  lastName: string
  phoneNumber: string
  city?: string
  email: string
}

export const createCustomer = async (
  data: CreateCustomerProps,
): Promise<Customer | null> => {
  try {
    const customer = await prismadb.customer.create({
      data: {
        ...data,
        password: '123456',
      },
    })

    return customer
  } catch (error: any) {
    console.log('[CREATE_CUSTOMER]', error.message)
    return null
  }
}
