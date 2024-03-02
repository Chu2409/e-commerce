'use server'

import prismadb from '@/lib/prismadb'
import { ORDER_STATE, Order, PAY_METHOD } from '@prisma/client'

interface CreateOrderProps
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {
  items: {
    productId: string
    quantity: number
  }[]
}

export const createOrder = async (
  data: CreateOrderProps,
): Promise<Order | null> => {
  try {
    const order = await prismadb.order.create({
      data: {
        ...data,
        state: data.state.replace(' ', '_') as ORDER_STATE,
        payMethod: data.payMethod?.replace(' ', '_') as PAY_METHOD,
        items: {
          createMany: {
            data: data.items.map((item) => ({
              quantity: item.quantity,
              productId: item.productId,
            })),
          },
        },
      },
    })

    return order
  } catch (error) {
    console.log('[ORDER_CREATE]', error)
    return null
  }
}
