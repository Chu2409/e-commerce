'use server'

import prismadb from '@/lib/prismadb'
import { Category } from '@prisma/client'

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prismadb.category.findMany()

    return categories
  } catch (error) {
    console.log('[CATEGORIES_GET]', error)
    return []
  }
}
