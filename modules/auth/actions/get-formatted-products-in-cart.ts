'use server'

import prismadb from '@/lib/prismadb'
import { IProductCart } from '@/modules/cart/store/cart'
import { ORDER_STATE } from '@prisma/client'

export const getFormattedProductsInCart = async (
  customerId: string,
): Promise<IProductCart[]> => {
  try {
    const lastOrderId = await prismadb.order.findFirst({
      where: {
        customerId,
        state: ORDER_STATE.GENERADO,
      },
      select: {
        id: true,
      },
    })

    if (!lastOrderId) return []

    const items = await prismadb.item.findMany({
      where: {
        orderId: lastOrderId.id,
      },
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
    })

    return items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      state: item.state,
    }))
  } catch (error: any) {
    console.log('[GET_FORMATTED_PRODUCTS_IN_CART]', error.message)
    return []
  }
}
