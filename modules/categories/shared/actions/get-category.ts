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
  } catch (error: any) {
    console.log('[GET_CATEGORY]', error.message)
    return null
  }
}
