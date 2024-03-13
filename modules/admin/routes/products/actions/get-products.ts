'use server'

import prismadb from '@/lib/prismadb'
import { IProductsFilters } from '../interfaces/products-filters'
import { PRODUCT_STATE } from '@prisma/client'
import { IFullProductMaster } from '../interfaces/product'

export const getProducts = async (
  filters?: IProductsFilters,
): Promise<IFullProductMaster[]> => {
  try {
    const productMasters = await prismadb.productMaster.findMany({
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
      },
      take: filters?.take || 16,
      skip: filters?.skip || 0,
    })

    const productsWithFilteredProducts = await Promise.all(
      productMasters.map(async (productMaster) => {
        const productsColors = await prismadb.productColor.findMany({
          where: {
            productMasterId: productMaster.id,
            colorId: filters?.colorId,
            products: {
              some: {
                state: filters?.state?.replace(' ', '_') as PRODUCT_STATE,
                sizeCategoryId: filters?.sizeId,
              },
            },
          },
          include: {
            color: true,
            images: true,
            products: {
              where: {
                state: filters?.state?.replace(' ', '_') as PRODUCT_STATE,
                sizeCategoryId: filters?.sizeId,
              },
              include: {
                sizeCategory: {
                  include: {
                    size: true,
                  },
                },
              },
            },
          },
        })

        return {
          ...productMaster,
          productsColors,
        }
      }),
    )
    return productsWithFilteredProducts
  } catch (error: any) {
    console.log('[GET_PRODUCTS]', error.message)
    return []
  }
}
