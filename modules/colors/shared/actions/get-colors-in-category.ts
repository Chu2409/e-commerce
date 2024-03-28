'use server'

import prismadb from '@/lib/prismadb'
import { Color } from '@prisma/client'

export const getColorsInCategory = async (
  categoryId: string,
): Promise<Color[]> => {
  try {
    const colors = await prismadb.color.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        productsColors: {
          some: {
            productMaster: {
              categoryId,
            },
          },
        },
      },
    })

    return colors
  } catch (error: any) {
    console.log('[GET_COLORS_IN_CATEGORY]', error.message)
    return []
  }
}
