'use server'

import prismadb from '@/lib/prismadb'
import { PRODUCT_STATE, Product } from '@prisma/client'

interface UpdateProductProps
  extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  images: { url: string }[]
}

export const updateProduct = async (
  id: string,
  data: UpdateProductProps,
): Promise<Product | null> => {
  try {
    await prismadb.product.update({
      where: {
        id,
      },
      data: {
        ...data,
        state: data.state.replace(' ', '_') as PRODUCT_STATE,
        images: {
          deleteMany: {},
        },
      },
    })

    const product = await prismadb.product.update({
      where: {
        id,
      },
      data: {
        images: {
          createMany: {
            data: data.images.map((image) => ({
              url: image.url,
            })),
          },
        },
      },
    })

    return product
  } catch (error) {
    console.log('[PRODUCT_CREATE]', error)
    return null
  }
}
