'use server'

import prismadb from '@/lib/prismadb'
import { IFullSize } from '../interfaces/size'
import { ISizesFilters } from '../interfaces/sizes-filters'

export const getSizes = async (
  filters?: ISizesFilters,
): Promise<IFullSize[]> => {
  try {
    const categories = await prismadb.sizeCategory.findMany({
      where: {
        categoryId: filters?.categoryId,
        size: {
          name: {
            contains: filters?.search,
          },
        },
      },
      include: {
        size: true,
        category: true,
      },
      take: filters?.take || 11,
      skip: filters?.skip || 0,
    })

    return categories
  } catch (error) {
    console.log('[SIZES_GET]', error)
    return []
  }
}
