'use server'

import prismadb from '@/lib/prismadb'
import { IFullSize } from '../interfaces/size'

export const getSizesByCategory = async (
  categoryId: string,
): Promise<Omit<IFullSize, 'category'>[]> => {
  try {
    const categories = await prismadb.sizeCategory.findMany({
      where: {
        categoryId,
      },
      include: {
        size: true,
      },
    })

    return categories
  } catch (error: any) {
    console.log('[GET_SIZES_BY_CATEGORY]', error.message)
    return []
  }
}
