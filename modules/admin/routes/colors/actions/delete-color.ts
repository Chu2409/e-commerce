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
  } catch (error: any) {
    console.log('[DELETE_COLOR]', error.message)
    return false
  }
}
