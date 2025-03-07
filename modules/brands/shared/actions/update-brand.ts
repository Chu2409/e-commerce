'use server'

import prismadb from '@/lib/prismadb'
import { Brand } from '@prisma/client'

export const updateBrand = async (id: string, data: Pick<Brand, 'name'>) => {
  try {
    const brand = await prismadb.brand.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })

    return brand
  } catch (error: any) {
    console.log('[UPDATE_BRAND]', error.message)
    return null
  }
}
