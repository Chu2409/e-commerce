'use server'

import prismadb from '@/lib/prismadb'
import { ProductMaster } from '@prisma/client'

export const createProductMaster = async (
  data: Omit<ProductMaster, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  try {
    const product = await prismadb.productMaster.create({
      data: {
        ...data,
      },
    })

    return product
  } catch (error: any) {
    console.log('[CREATE_PRODUCT_MASTER]', error.message)
    return null
  }
}
