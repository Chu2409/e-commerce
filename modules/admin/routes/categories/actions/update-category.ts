'use server'

import prismadb from '@/lib/prismadb'
import { Category } from '@prisma/client'

export const updateCategory = async (
  id: string,
  data: Pick<Category, 'name'>,
) => {
  try {
    const category = await prismadb.category.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })

    return category
  } catch (error) {
    console.log('[CATEGORY_UPDATE]', error)
    return null
  }
}
