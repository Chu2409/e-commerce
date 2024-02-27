'use server'

import prismadb from '@/lib/prismadb'
import { Color } from '@prisma/client'

export const updateColor = async (
  id: string,
  data: Partial<Pick<Color, 'name' | 'value' | 'active'>>,
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
  } catch (error) {
    console.log('[COLOR_UPDATE]', error)
    return null
  }
}
