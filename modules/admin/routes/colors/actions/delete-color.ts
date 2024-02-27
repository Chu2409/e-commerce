'use server'

import prismadb from '@/lib/prismadb'

export const deleteColor = async (id: string) => {
  try {
    const color = await prismadb.color.delete({
      where: {
        id,
      },
    })

    return !!color
  } catch (error) {
    console.log('[COLOR_DELETE]', error)
    return false
  }
}
