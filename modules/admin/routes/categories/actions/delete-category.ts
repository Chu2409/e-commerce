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
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error)
    return false
  }
}
