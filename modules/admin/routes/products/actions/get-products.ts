'use server'

import prismadb from '@/lib/prismadb'
import { IFullProduct } from '../interfaces/full-product'
import { IProductsFilters } from '../interfaces/products-filters'

export const getProducts = async (
  filters?: IProductsFilters,
): Promise<IFullProduct[]> => {
  try {
    const products = await prismadb.product.findMany({
      where: {
        name: {
          contains: filters?.name,
        },
        state: filters?.state,
        brandId: filters?.brandId,
        categoryId: filters?.categoryId,
        sizeId: filters?.sizeId,
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
      take: filters?.take || 11,
      skip: filters?.skip || 0,
    })

    return products
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return []
  }
}
