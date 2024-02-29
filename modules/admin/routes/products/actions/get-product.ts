'use server'

import prismadb from '@/lib/prismadb'
import { IFullProduct } from '../interfaces/full-product'

export const getProduct = async (id: string): Promise<IFullProduct | null> => {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id,
      },
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
    })

    return product
  } catch (error) {
    console.log('[PRODUCT_GET]', error)
    return null
  }
}
