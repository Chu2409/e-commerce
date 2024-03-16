'use server'

import {
  ORDER_STATE,
  PRODUCT_STATE,
  Prisma,
  PrismaClient,
  Product,
} from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export const decrementProductQuantity = async ({
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
  const product = (await prisma.product.findUnique({
    where: { id: productId },
  })) as Product

  if (product.stock === 0 || product.state !== PRODUCT_STATE.DISPONIBLE) return

  if (product.stock - quantity === 0) {
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity,
        },
        state: PRODUCT_STATE.NO_DISPONIBLE,
      },
    })

    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            productId,
          },
        },
        state: ORDER_STATE.GENERADO,
      },
      include: {
        items: true,
      },
    })

    for (const order of orders) {
      if (order.items.length === 1) {
        await prisma.order.delete({
          where: {
            id: order.id,
          },
        })
      } else {
        const item = await prisma.item.findMany({
          where: {
            orderId: order.id,
            productId,
          },
        })

        await prisma.item.delete({
          where: {
            id: item[0].id,
          },
        })

        await prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            total: order.total - product.price * item[0].quantity,
            finalTotal: order.total - product.price * item[0].quantity,
          },
        })
      }
    }
  } else {
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    })

    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            productId,
          },
        },
        state: ORDER_STATE.GENERADO,
      },
      include: {
        items: true,
      },
    })

    for (const order of orders) {
      const productInOrder = order.items.find(
        (item) => item.productId === productId,
      )

      if (productInOrder != null && productInOrder.quantity > product.stock) {
        await prisma.item.updateMany({
          where: {
            orderId: order.id,
            productId,
          },
          data: {
            quantity: product.stock,
          },
        })

        const newTotal =
          order.total -
          product.price * (productInOrder.quantity - product.stock)

        await prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            total: newTotal,
            finalTotal: newTotal,
          },
        })
      }
    }
  }
}
