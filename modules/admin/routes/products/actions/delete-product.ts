'use server'

import prismadb from '@/lib/prismadb'

export const deleteProduct = async (id: string) => {
  try {
    const product = await prismadb.product.delete({
      where: {
        id,
      },
    })

    return !!product
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error)
    return false
  }
}
