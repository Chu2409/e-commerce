'use server'

import prismadb from '@/lib/prismadb'
import { IFullOrder } from '../interfaces/order'

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
                sizeCategory: {
                  include: {
                    size: true,
                    category: true,
                  },
                },
                productColor: {
                  include: {
                    color: true,
                    images: true,
                    productMaster: {
                      include: {
                        brand: true,
                      },
                    },
                  },
                },
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
