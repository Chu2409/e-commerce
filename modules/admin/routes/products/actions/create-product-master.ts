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
  } catch (error) {
    console.log('[CREATE_MASTER_PRODUCT]', error)
    return null
  }
}
