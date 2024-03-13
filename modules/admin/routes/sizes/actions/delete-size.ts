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
  } catch (error: any) {
    console.log('[DELETE_SIZE]', error.message)
    return false
  }
}
