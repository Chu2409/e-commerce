'use server'

import prismadb from '@/lib/prismadb'
import { IFullSize } from '../interfaces/size'

export const getSizeCategory = async (
  id: string,
): Promise<IFullSize | null> => {
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
  } catch (error: any) {
    console.log('[GET_SIZE_CATEGORY]', error.message)
    return null
  }
}
