'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductMaster } from '../interfaces/product'

export const getProductsByMaster = async (
  id: string,
): Promise<IFullProductMaster | null> => {
  try {
    const productMaster = await prismadb.productMaster.findUnique({
      where: {
        id,
      },
      include: {
        brand: true,
        category: true,
        productsColors: {
          include: {
            color: true,
            images: true,
            products: {
              include: {
                sizeCategory: {
                  include: {
                    size: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return productMaster
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return null
  }
}
