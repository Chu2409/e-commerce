'use server'

import { PRODUCT_STATE, Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export const incrementProductQuantity = async ({
  prisma,
  productId,
  quantity,
}: {
  prisma: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >
  productId: string
  quantity: number
}) => {
  await prisma.product.update({
    where: { id: productId },
    data: {
      stock: {
        increment: quantity,
      },
      state: PRODUCT_STATE.DISPONIBLE,
    },
  })
}
