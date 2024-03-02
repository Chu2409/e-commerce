'use server'

import prismadb from '@/lib/prismadb'
import { IFullOrder } from '../interfaces/full-order'

export const getOrder = async (id: string): Promise<IFullOrder | null> => {
  try {
    const order = await prismadb.order.findFirst({
      where: {
        id,
      },
      include: {
        customer: true,
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
                color: true,
                size: {
                  include: {
                    size: true,
                    category: true,
                  },
                },
                images: true,
              },
            },
          },
        },
      },
    })

    return order
  } catch (error) {
    console.log('[ORDER_GET]', error)
    return null
  }
}
