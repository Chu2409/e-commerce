'use server'

import prismadb from '@/lib/prismadb'
import { Category } from '@prisma/client'

export const getCategoriesMaster = async (): Promise<Category[]> => {
  try {
    const categories = await prismadb.category.findMany({
      where: {
        masterCategoryId: null,
      },
    })

    return categories
  } catch (error: any) {
    console.log('[GET_CATEGORIES_MASTER]', error.message)
    return []
  }
}
