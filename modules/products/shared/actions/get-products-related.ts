'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductMaster } from '../interfaces/product'

export const getProductsRelated = async (
  categoryId: string,
): Promise<IFullProductMaster[]> => {
  try {
    const productsMasters = await prismadb.productMaster.findMany({
      where: {
        categoryId,
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
      take: 8,
    })

    return productsMasters
  } catch (error: any) {
    console.log('[GET_PRODUCTS_RELATED]', error.message)
    return []
  }
}
