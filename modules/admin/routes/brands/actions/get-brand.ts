'use server'

import prismadb from '@/lib/prismadb'
import { Brand } from '@prisma/client'

export const getBrand = async (id: string): Promise<Brand | null> => {
  try {
    const brand = await prismadb.brand.findUnique({
      where: {
        id,
      },
    })

    return brand
  } catch (error) {
    console.log('[BRAND_GET]', error)
    return null
  }
}
