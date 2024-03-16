'use server'

import prismadb from '@/lib/prismadb'
import { Customer } from '@prisma/client'
import { CreateCustomerProps } from './create-customer'

export const updateCustomer = async (
  id: string,
  data: CreateCustomerProps,
): Promise<Customer | null> => {
  try {
    const customer = await prismadb.customer.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })

    return customer
  } catch (error: any) {
    console.log('[UPDATE_CUSTOMER]', error.message)
    return null
  }
}
