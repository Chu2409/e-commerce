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
  } catch (error: any) {
    console.log('[DELETE_CUSTOMER]', error.message)
    return false
  }
}
