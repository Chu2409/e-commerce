'use server'

import prismadb from '@/lib/prismadb'
import { IFullCategory } from '../interfaces/categories'

export const getCategories = async (): Promise<IFullCategory[]> => {
  try {
    const categories = await prismadb.category.findMany({
      include: {
        masterCategory: true,
      },
    })

    return categories
  } catch (error: any) {
    console.log('[GET_CATEGORIES]', error.message)
    return []
  }
}
