'use server'

import prismadb from '@/lib/prismadb'
import { IFullSize } from '../interfaces/full-size'

export const getSizesByCategory = async (
  categoryId: string,
): Promise<Omit<IFullSize, 'category'>[]> => {
  try {
    const categories = await prismadb.sizeByCategory.findMany({
      where: {
        categoryId,
      },
      include: {
        size: true,
      },
    })

    return categories
  } catch (error) {
    console.log('[SIZES_BY_CATEGORY_GET]', error)
    return []
  }
}
