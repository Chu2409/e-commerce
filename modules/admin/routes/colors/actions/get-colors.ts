'use server'

import prismadb from '@/lib/prismadb'
import { Color } from '@prisma/client'

export const getColors = async (): Promise<Color[]> => {
  try {
    const colors = await prismadb.color.findMany()

    return colors
  } catch (error) {
    console.log('[COLORS_GET]', error)
    return []
  }
}
