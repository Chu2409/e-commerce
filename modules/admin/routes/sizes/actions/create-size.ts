'use server'

import prismadb from '@/lib/prismadb'
import { SizeCategory } from '@prisma/client'

interface CreateSizeProps {
  name: string
  value: string
  categoryId: string
}

export const createSize = async (
  data: CreateSizeProps,
): Promise<SizeCategory | null> => {
  try {
    const sizeSelected = await prismadb.size.findFirst({
      where: {
        name: data.name,
        value: data.value,
      },
    })

    if (sizeSelected) {
      const sizeExists = await prismadb.sizeCategory.findFirst({
        where: {
          sizeId: sizeSelected.id,
          categoryId: data.categoryId,
        },
      })

      if (sizeExists) return null

      const sizeByCategory = await prismadb.sizeCategory.create({
        data: {
          sizeId: sizeSelected.id,
          categoryId: data.categoryId,
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

    const sizeByCategory = await prismadb.sizeCategory.create({
      data: {
        sizeId: size.id,
        categoryId: data.categoryId,
      },
    })

    return sizeByCategory
  } catch (error: any) {
    console.log('[CREATE_SIZE]', error.message)
    return null
  }
}
