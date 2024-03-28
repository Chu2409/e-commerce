'use server'

import prismadb from '@/lib/prismadb'
import { IFullCategory } from '../interfaces/categories'

export const getFullCategories = async (): Promise<IFullCategory[]> => {
  try {
    const categories = await prismadb.category.findMany({
      include: {
        masterCategory: true,
      },
    })

    return categories
  } catch (error: any) {
    console.log('[GET_FULL_CATEGORIES]', error.message)
    return []
  }
}
