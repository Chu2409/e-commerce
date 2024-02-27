'use server'

import prismadb from '@/lib/prismadb'

export const deleteCustomer = async (id: string) => {
  try {
    const customer = await prismadb.customer.delete({
      where: {
        id,
      },
    })

    return !!customer
  } catch (error) {
    console.log('[CUSTOMER_DELETE]', error)
    return false
  }
}
