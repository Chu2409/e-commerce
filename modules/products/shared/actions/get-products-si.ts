'use server'

import prismadb from '@/lib/prismadb'
import { IProductsFilters } from '../interfaces/products-filters'
import { PRODUCT_STATE } from '@prisma/client'
import { IFullProductMaster } from '../interfaces/product'

export const getProducts = async (
  filters?: IProductsFilters,
): Promise<IFullProductMaster[]> => {
  try {
    const productsMasters = await prismadb.productMaster.findMany({
      where: {
        name: {
          contains: filters?.name,
        },
        brandId: filters?.brandId,
        categoryId: filters?.categoryId,
        productsColors: {
          some: {
            colorId: filters?.colorId,
            products: {
              some: {
                sizeCategoryId: filters?.sizeId,
                state: filters?.state?.replace(' ', '_') as PRODUCT_STATE,
              },
            },
          },
        },
      },
      include: {
        brand: true,
        category: true,
        productsColors: {
          where: {
            colorId: filters?.colorId,
            products: {
              some: {
                sizeCategoryId: filters?.sizeId,
                state: filters?.state?.replace(' ', '_') as PRODUCT_STATE,
              },
            },
          },
          include: {
            products: {
              where: {
                sizeCategoryId: filters?.sizeId,
                state: filters?.state?.replace(' ', '_') as PRODUCT_STATE,
              },
              include: {
                sizeCategory: {
                  include: {
                    size: true,
                  },
                },
              },
            },
            color: true,
            images: true,
          },
        },
      },
      take: filters?.take || 11,
      skip: filters?.skip || 0,
    })

    return productsMasters
  } catch (error: any) {
    console.log('[GET_PRODUCTS]', error.message)
    return []
  }
}
