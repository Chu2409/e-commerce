'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductOrder } from '../../orders/interfaces/order'

export const getAllProducts = async (): Promise<IFullProductOrder[]> => {
  try {
    const products = await prismadb.product.findMany({
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
    console.log('ALL_PRODUCTS_GET]', error)
    return []
  }
}
