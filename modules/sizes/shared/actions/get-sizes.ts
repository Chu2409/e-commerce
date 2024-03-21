'use server'

import prismadb from '@/lib/prismadb'
import { Size } from '@prisma/client'

export const getSizes = async (): Promise<Size[]> => {
  try {
    const sizes = await prismadb.size.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return sizes
  } catch (error: any) {
    console.log('[GET_SIZES]', error.message)
    return []
  }
}
