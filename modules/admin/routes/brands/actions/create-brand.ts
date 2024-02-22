'use server'

import prismadb from '@/lib/prismadb'
import { Brand } from '@prisma/client'

export const createBrand = async (data: Pick<Brand, 'name' | 'active'>) => {
  try {
    const brand = await prismadb.brand.create({
      data: {
        ...data,
      },
    })

    return brand
  } catch (error) {
    console.log('[BRAND_CREATE]', error)
    return null
  }
}
