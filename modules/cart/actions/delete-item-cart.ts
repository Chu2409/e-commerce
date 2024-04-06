'use server'

import prismadb from '@/lib/prismadb'
import { ORDER_STATE } from '@prisma/client'

interface IDeleteItemCart {
  customerId: string
  productId: string
}

export const deleteItemCart = async ({
  customerId,
  productId,
}: IDeleteItemCart) => {
  const order = await prismadb.order.findFirst({
    where: {
      customerId,
      state: ORDER_STATE.GENERADO,
    },
    include: {
      items: true,
    },
  })

  if (!order) throw new Error()

  const item = order.items.find((item) => item.productId === productId)

  const itemDeleted = await prismadb.item.delete({
    where: {
      id: item?.id,
    },
    include: {
      product: true,
    },
  })

  if (order.items.length === 1) {
    await prismadb.order.delete({
      where: {
        id: order.id,
      },
    })

    return itemDeleted
  }

  const total = order.total - itemDeleted.quantity * itemDeleted.product.price

  await prismadb.order.update({
    where: {
      id: order.id,
    },
    data: {
      total,
      finalTotal: total,
    },
  })

  return itemDeleted
}
