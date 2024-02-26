'use server'

import prismadb from '@/lib/prismadb'
import { Size } from '@prisma/client'

export const updateSize = async (
  id: string,
  data: Partial<Pick<Size, 'name' | 'value'>>,
) => {
  try {
    const sizeSelected = await prismadb.size.findFirst({
      where: {
        name: data.name,
        value: data.value,
      },
    })

    if (sizeSelected) {
      const sizeByCategory = await prismadb.sizeByCategory.updateMany({
        where: {
          sizeId: id,
        },
        data: {
          sizeId: sizeSelected.id,
        },
      })

      return sizeByCategory
    }

    const size = await prismadb.size.update({
      where: {
        id,
      },
      data,
    })

    return size
  } catch (error) {
    console.log('[SIZE_UPDATE]', error)
    return null
  }
}
