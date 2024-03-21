'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductMaster } from '../interfaces/product'
import { PRODUCT_GENDER, PRODUCT_STATE } from '@prisma/client'

export const getProductsByCategory = async (
  categoryId: string,
  filters?: {
    gender?: string
    brandId?: string
    sizeId?: string
    state?: string
    colorId?: string
  },
): Promise<IFullProductMaster[]> => {
  try {
    const productsMasters = await prismadb.productMaster.findMany({
      where: {
        categoryId,
        brandId: filters?.brandId,
        gender: filters?.gender as PRODUCT_GENDER,
        productsColors: {
          some: {
            colorId: filters?.colorId,
            products: {
              some: {
                sizeCategory: {
                  sizeId: filters?.sizeId,
                },
                state: {
                  not: PRODUCT_STATE.NO_DISPONIBLE,
                },
                AND: {
                  state: filters?.state as PRODUCT_STATE,
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
                sizeCategory: {
                  sizeId: filters?.sizeId,
                },
                state: {
                  not: PRODUCT_STATE.NO_DISPONIBLE,
                },
                AND: {
                  state: filters?.state as PRODUCT_STATE,
                },
              },
            },
          },
          where: {
            colorId: filters?.colorId,
            products: {
              some: {
                sizeCategory: {
                  sizeId: filters?.sizeId,
                },
                state: {
                  not: PRODUCT_STATE.NO_DISPONIBLE,
                },
                AND: {
                  state: filters?.state as PRODUCT_STATE,
                },
              },
            },
          },
        },
      },
    })

    return productsMasters
  } catch (error: any) {
    console.log('[GET_PRODUCTS_BY_CATEGORY]', error.message)
    return []
  }
}
