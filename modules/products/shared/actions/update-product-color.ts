'use server'

import prismadb from '@/lib/prismadb'

interface UpdateProductColorData {
  colorId: string
  images: {
    url: string
  }[]
}

export const updateProductColor = async (
  id: string,
  data: UpdateProductColorData,
) => {
  try {
    await prismadb.productColor.update({
      where: {
        id,
      },
      data: {
        colorId: data.colorId,
        images: {
          deleteMany: {},
        },
      },
    })

    const productColor = await prismadb.productColor.update({
      where: {
        id,
      },
      data: {
        images: {
          createMany: {
            data: data.images,
          },
        },
      },
    })

    return productColor
  } catch (error: any) {
    console.log('[UPDATE_PRODUCT_COLOR]', error.message)
    return null
  }
}
