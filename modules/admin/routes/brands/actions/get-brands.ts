'use server'

import prismadb from '@/lib/prismadb'
import { Brand } from '@prisma/client'

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const brands = await prismadb.brand.findMany()

    return brands
  } catch (error: any) {
    console.log('[GET_BRANDS]', error.message)
    return []
  }
}
