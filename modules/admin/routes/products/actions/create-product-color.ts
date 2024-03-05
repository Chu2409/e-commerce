'use server'

import prismadb from '@/lib/prismadb'

interface CreateProductColorData {
  productMasterId: string
  colorId: string
  images: {
    url: string
  }[]
}

export const createProductColor = async (data: CreateProductColorData) => {
  try {
    const productColor = await prismadb.productColor.create({
      data: {
        ...data,
        images: {
          createMany: {
            data: data.images,
          },
        },
      },
    })

    return productColor
  } catch (error) {
    console.log('[CREATE_PRODUCT_COLOR]', error)
    return null
  }
}
