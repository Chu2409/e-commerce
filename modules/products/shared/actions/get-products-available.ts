'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductOrder } from '@/modules/orders/shared/interfaces/order'
import { PRODUCT_STATE } from '@prisma/client'

export const getProductsAvailable = async (): Promise<IFullProductOrder[]> => {
  try {
    const products = await prismadb.product.findMany({
      where: {
        state: {
          not: PRODUCT_STATE.NO_DISPONIBLE,
        },
      },
      include: {
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
        sizeCategory: {
          include: {
            category: true,
            size: true,
          },
        },
      },
    })

    return products
  } catch (error: any) {
    console.log('[GET_PRODUCTS_AVAILABLE]', error.message)
    return []
  }
}
