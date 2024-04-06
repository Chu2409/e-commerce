'use server'

import prismadb from '@/lib/prismadb'
import { ORDER_STATE } from '@prisma/client'

interface AddProductToCartProps {
  customerId: string
  productId: string
  quantity: number
  productPrice: number
}

export const addProductToCart = async ({
  customerId,
  productId,
  quantity,
  productPrice,
}: AddProductToCartProps) => {
  const order = await prismadb.order.findFirst({
    where: {
      customerId,
      state: ORDER_STATE.GENERADO,
    },
  })

  if (order) {
    const itemExists = await prismadb.item.findFirst({
      where: {
        orderId: order.id,
        productId,
      },
    })

    if (itemExists) throw new Error('Producto ya se encuentra en el carrito')

    const item = await prismadb.item.create({
      data: {
        orderId: order.id,
        productId,
        quantity,
      },
    })

    await prismadb.order.update({
      where: {
        id: order.id,
      },
      data: {
        total: order.total + productPrice * quantity,
        finalTotal: order.total + productPrice * quantity,
      },
    })

    return item
  }

  const newOrder = await prismadb.order.create({
    data: {
      customerId,
      state: ORDER_STATE.GENERADO,
      date: new Date(),
      total: productPrice * quantity,
      finalTotal: productPrice * quantity,
    },
  })

  const item = await prismadb.item.create({
    data: {
      orderId: newOrder.id,
      productId,
      quantity,
    },
  })

  return item
}
