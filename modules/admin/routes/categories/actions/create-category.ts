'use server'

import prismadb from '@/lib/prismadb'
import { Category } from '@prisma/client'

export const createCategory = async (
  data: Pick<Category, 'name' | 'active'>,
) => {
  try {
    const category = await prismadb.category.create({
      data: {
        ...data,
      },
    })

    return category
  } catch (error) {
    console.log('[CATEGORY_CREATE]', error)
    return null
  }
}
