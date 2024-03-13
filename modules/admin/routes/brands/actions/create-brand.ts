'use server'

import prismadb from '@/lib/prismadb'
import { Brand } from '@prisma/client'

export const createBrand = async (data: Pick<Brand, 'name'>) => {
  try {
    const brand = await prismadb.brand.create({
      data: {
        ...data,
      },
    })

    return brand
  } catch (error: any) {
    console.log('[CREATE_BRAND]', error.message)
    return null
  }
}
