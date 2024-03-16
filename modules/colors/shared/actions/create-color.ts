'use server'

import prismadb from '@/lib/prismadb'
import { Color } from '@prisma/client'

export const createColor = async (
  data: Pick<Color, 'name' | 'value'>,
): Promise<Color | null> => {
  try {
    const color = await prismadb.color.create({
      data: {
        ...data,
      },
    })

    return color
  } catch (error: any) {
    console.log('[CREATE_COLOR]', error.message)
    return null
  }
}
