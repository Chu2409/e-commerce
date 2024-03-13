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
  } catch (error: any) {
    console.log('[DELETE_BRAND]', error.message)
    return false
  }
}
