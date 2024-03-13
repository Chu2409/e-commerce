'use server'

import prismadb from '@/lib/prismadb'
import { Color } from '@prisma/client'

export const updateColor = async (
  id: string,
  data: Pick<Color, 'name' | 'value'>,
): Promise<Color | null> => {
  try {
    const color = await prismadb.color.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })

    return color
  } catch (error: any) {
    console.log('[UPDATE_COLOR]', error.message)
    return null
  }
}
