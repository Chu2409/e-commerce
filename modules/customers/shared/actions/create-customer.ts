'use server'

import prismadb from '@/lib/prismadb'
import { Customer } from '@prisma/client'
import bcrypt from 'bcrypt'

export interface CreateCustomerProps {
  dni: string
  firstName: string
  lastName: string
  phoneNumber: string
  city?: string
  email: string
  password?: string
}

export const createCustomer = async (
  data: CreateCustomerProps,
): Promise<Customer | null> => {
  try {
    const password = data.password || data.dni

    const customer = await prismadb.customer.create({
      data: {
        ...data,
        password: bcrypt.hashSync(password, 10),
      },
    })

    return customer
  } catch (error: any) {
    console.log('[CREATE_CUSTOMER]', error.message)
    return null
  }
}
