'use server'

import prismadb from '@/lib/prismadb'
import { Product } from '@prisma/client'

interface CreateProductProps
  extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  images: { url: string }[]
}

export const createProduct = async (
  data: CreateProductProps,
): Promise<Product | null> => {
  try {
    const product = await prismadb.product.create({
      data: {
        ...data,
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
