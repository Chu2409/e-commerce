'use server'

import prismadb from '@/lib/prismadb'
import { ORDER_STATE, Order, PAY_METHOD } from '@prisma/client'
import { decrementProductQuantity } from '../utils/decrement-product-quantity'

interface CreateOrderProps
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {
  items: {
    productId: string
    quantity: number
    delivered?: boolean
  }[]
}

export const createOrderWithItems = async (data: CreateOrderProps) => {
  try {
    const { items, ...orderData } = data

    return await prismadb.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          ...orderData,
          payMethod:
            orderData.state === ORDER_STATE.GENERADO
              ? null
              : orderData.payMethod || PAY_METHOD.EFECTIVO,
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
        for (const { productId, quantity, delivered } of items) {
          const product = await prisma.product.findUnique({
            where: { id: productId },
          })

          await prisma.item.create({
            data: {
              orderId: order.id,
              productId,
              quantity,
              state: product?.state,
              delivered:
                order.state === ORDER_STATE.FINALIZADO ? true : delivered,
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
  } catch (error: any) {
    console.log('[CREATE_ORDER_WITH_ITEMS]', error.message)
    return null
  }
}
