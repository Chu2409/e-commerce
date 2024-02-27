'use server'

import prismadb from '@/lib/prismadb'
import { Customer } from '@prisma/client'

export const getCustomer = async (id: string): Promise<Customer | null> => {
  try {
    const customer = await prismadb.customer.findUnique({
      where: {
        id,
      },
    })

    return customer
  } catch (error) {
    console.log('[CUSTOMER_GET]', error)
    return null
  }
}
