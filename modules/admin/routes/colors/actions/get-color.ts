'use server'

import prismadb from '@/lib/prismadb'
import { Color } from '@prisma/client'

export const getColor = async (id: string): Promise<Color | null> => {
  try {
    const color = await prismadb.color.findUnique({
      where: {
        id,
      },
    })

    return color
  } catch (error: any) {
    console.log('[GET_COLOR]', error.message)
    return null
  }
}
