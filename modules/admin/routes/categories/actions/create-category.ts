'use server'

import prismadb from '@/lib/prismadb'
import { Category } from '@prisma/client'

export const createCategory = async (data: Pick<Category, 'name'>) => {
  try {
    const category = await prismadb.category.create({
      data: {
        ...data,
      },
    })

    return category
  } catch (error: any) {
    console.log('[CREATE_CATEGORY]', error.message)
    return null
  }
}
