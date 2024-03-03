'use server'

import prismadb from '@/lib/prismadb'
import { IFullSize } from '../interfaces/size'

export const getSize = async (id: string): Promise<IFullSize | null> => {
  try {
    const size = await prismadb.sizeCategory.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        size: true,
      },
    })

    return size
  } catch (error) {
    console.log('[SIZE_GET]', error)
    return null
  }
}
