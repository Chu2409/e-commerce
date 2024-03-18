'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductMaster } from '../interfaces/product'
import { PRODUCT_STATE } from '@prisma/client'

export const getProductsRelated = async (
  categoryId: string,
): Promise<IFullProductMaster[]> => {
  try {
    const productsMasters = await prismadb.productMaster.findMany({
      where: {
        categoryId,
        productsColors: {
          some: {
            products: {
              some: {
                state: {
                  not: PRODUCT_STATE.NO_DISPONIBLE,
                },
              },
            },
          },
        },
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
              where: {
                state: {
                  not: PRODUCT_STATE.NO_DISPONIBLE,
                },
              },
            },
          },
          where: {
            products: {
              some: {
                state: {
                  not: PRODUCT_STATE.NO_DISPONIBLE,
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
