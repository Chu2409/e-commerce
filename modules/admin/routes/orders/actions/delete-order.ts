'use server'

import prismadb from '@/lib/prismadb'

export const deleteOrder = async (id: string) => {
  try {
    const order = await prismadb.order.delete({
      where: {
        id,
      },
    })

    return !!order
  } catch (error: any) {
    console.log('[DELETE_ORDER]', error.message)
    return false
  }
}
