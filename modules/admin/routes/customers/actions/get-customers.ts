'use server'

import prismadb from '@/lib/prismadb'
import { Customer } from '@prisma/client'

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const customers = await prismadb.customer.findMany()

    return customers
  } catch (error) {
    console.log('[CUSTOMERS_GET]', error)
    return []
  }
}
