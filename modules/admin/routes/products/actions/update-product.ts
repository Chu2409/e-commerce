'use server'

import prismadb from '@/lib/prismadb'
import { PRODUCT_STATE, Product } from '@prisma/client'

export const updateProduct = async (
  id: string,
  data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'productColorId'>,
) => {
  try {
    const product = await prismadb.product.update({
      where: {
        id,
      },
      data: {
        ...data,
        state: data.state.replace(' ', '_') as PRODUCT_STATE,
      },
    })

    return product
  } catch (error) {
    console.log('[PRODUCT_UPDATE]', error)
    return null
  }
}
