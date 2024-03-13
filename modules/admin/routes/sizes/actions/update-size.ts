'use server'

import prismadb from '@/lib/prismadb'
import { Size } from '@prisma/client'

export const updateSize = async (
  id: string,
  data: Pick<Size, 'name' | 'value'>,
) => {
  try {
    const sizeSelected = await prismadb.size.findFirst({
      where: {
        name: data.name,
        value: data.value,
      },
    })

    if (sizeSelected) {
      const sizeByCategory = await prismadb.sizeCategory.updateMany({
        where: {
          sizeId: id,
        },
        data: {
          sizeId: sizeSelected.id,
        },
      })

      return sizeByCategory
    }

    const size = await prismadb.size.create({
      data: {
        name: data.name,
        value: data.value,
      },
    })

    const sizeByCategory = await prismadb.sizeCategory.update({
      where: {
        id,
      },
      data: {
        sizeId: size.id,
      },
    })

    return sizeByCategory
  } catch (error: any) {
    console.log('[UPDATE_SIZE]', error.message)
    return null
  }
}
