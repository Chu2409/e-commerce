'use server'

import prismadb from '@/lib/prismadb'
import { ORDER_STATE, Order } from '@prisma/client'
import { decrementProductQuantity } from '../utils/decrement-product-quantity'

interface CreateOrderProps
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {
  items: {
    productId: string
    quantity: number
  }[]
}

export const createOrderWithItems = async (data: CreateOrderProps) => {
  try {
    const { items, ...orderData } = data

    return await prismadb.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          ...orderData,
        },
      })

      if (order.state === ORDER_STATE.GENERADO) {
        for (const { productId, quantity } of items) {
          await prisma.item.create({
            data: {
              orderId: order.id,
              productId,
              quantity,
            },
          })
        }
      } else {
        for (const { productId, quantity } of items) {
          const product = await prisma.product.findUnique({
            where: { id: productId },
          })

          await prisma.item.create({
            data: {
              orderId: order.id,
              productId,
              quantity,
              state: product?.state,
            },
          })

          await decrementProductQuantity({
            prisma,
            productId,
            quantity,
          })
        }
      }

      return order
    })
  } catch (error) {
    console.log('[ORDER_CREATE]', error)
    return null
  }
}
