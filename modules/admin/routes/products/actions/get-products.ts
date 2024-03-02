'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductMaster } from '../interfaces/full-product'
import { IProductsFilters } from '../interfaces/products-filters'

export const getProducts = async (
  filters?: IProductsFilters,
): Promise<IFullProductMaster[]> => {
  try {
    const products = await prismadb.productMaster.findMany({
      where: {
        name: {
          contains: filters?.name,
          mode: 'insensitive',
        },
        brandId: filters?.brandId,
        categoryId: filters?.categoryId,
        products: {
          some: {
            state: filters?.state,
            sizeId: filters?.sizeId,
            colorId: filters?.colorId,
          },
        },
      },
      include: {
        brand: true,
        category: true,
        products: {
          where: {
            state: filters?.state,
            sizeId: filters?.sizeId,
            colorId: filters?.colorId,
          },
          include: {
            color: true,
            size: {
              include: {
                size: true,
              },
            },
            images: true,
          },
        },
      },
      take: filters?.take || 16,
      skip: filters?.skip || 0,
    })

    return products
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return []
  }
}
