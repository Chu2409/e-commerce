'use server'

import prismadb from '@/lib/prismadb'
import { PRODUCT_STATE, Product } from '@prisma/client'

export const createProduct = async (
  data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  try {
    const product = await prismadb.product.create({
      data: {
        ...data,
        state: data.state.replace(' ', '_') as PRODUCT_STATE,
        stock: data.state === PRODUCT_STATE.DISPONIBLE ? data.stock : 0,
      },
    })

    return product
  } catch (error) {
    console.log('[CREATE_PRODUCT]', error)
    return null
  }
}
