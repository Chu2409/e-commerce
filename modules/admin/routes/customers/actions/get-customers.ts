'use server'

import prismadb from '@/lib/prismadb'
import { Customer } from '@prisma/client'

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const customers = await prismadb.customer.findMany()

    return customers
  } catch (error: any) {
    console.log('[GET_CUSTOMERS]', error.message)
    return []
  }
}
