'use server'

import prismadb from '@/lib/prismadb'

export const deleteBrand = async (id: string) => {
  try {
    const brand = await prismadb.brand.delete({
      where: {
        id,
      },
    })

    return !!brand
  } catch (error) {
    console.log('[BRAND_DELETE]', error)
    return false
  }
}
