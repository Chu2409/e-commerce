'use server'

import prismadb from '@/lib/prismadb'

export const deleteCategory = async (id: string) => {
  try {
    const category = await prismadb.category.delete({
      where: {
        id,
      },
    })

    return !!category
  } catch (error: any) {
    console.log('[DELETE_CATEGORY]', error.message)
    return false
  }
}
