'use server'

import prismadb from '@/lib/prismadb'
import { Category } from '@prisma/client'

export const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const category = await prismadb.category.findUnique({
      where: {
        id,
      },
    })

    return category
  } catch (error) {
    console.log('[CATEGORY_GET]', error)
    return null
  }
}
