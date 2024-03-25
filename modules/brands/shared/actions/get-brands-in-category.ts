'use server'

import prismadb from '@/lib/prismadb'
import { Brand } from '@prisma/client'

export const getBrandsInCategory = async (
  categoryId: string,
): Promise<Brand[]> => {
  try {
    const brands = await prismadb.brand.findMany({
      where: {
        productsMaster: {
          some: {
            categoryId,
          },
        },
      },
    })

    return brands
  } catch (error: any) {
    console.log('[GET_BRANDS]', error.message)
    return []
  }
}
