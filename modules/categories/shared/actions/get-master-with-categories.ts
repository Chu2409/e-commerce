'use server'

import prismadb from '@/lib/prismadb'
import { IMasterCategoryWithCategories } from '../interfaces/categories'

export const getMasterWithCategories = async (): Promise<
  IMasterCategoryWithCategories[]
> => {
  try {
    const categories = await prismadb.category.findMany({
      where: {
        masterCategoryId: null,
      },
      include: {
        categories: true,
      },
    })

    return categories
  } catch (error: any) {
    console.log('[GET_MASTER_WITH_CATEGORIES]', error.message)
    return []
  }
}
