'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductOrder } from '../../orders/interfaces/order'
import { PRODUCT_STATE } from '@prisma/client'

export const getAllProductsAvailable = async (): Promise<
  IFullProductOrder[]
> => {
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
  } catch (error) {
    console.log('ALL_PRODUCTS_AVAILABLE_GET]', error)
    return []
  }
}
