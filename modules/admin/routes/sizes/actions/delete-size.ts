'use server'

import prismadb from '@/lib/prismadb'

export const deleteSize = async (id: string) => {
  try {
    const size = await prismadb.sizeCategory.delete({
      where: {
        id,
      },
    })

    return !!size
  } catch (error) {
    console.log('[SIZE_DELETE]', error)
    return false
  }
}
