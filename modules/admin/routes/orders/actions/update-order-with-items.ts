'use server'

import prismadb from '@/lib/prismadb'
import { Item, ORDER_STATE, Order } from '@prisma/client'
import { decrementProductQuantity } from '../utils/decrement-product-quantity'
import { incrementProductQuantity } from '../utils/increment-product-quantity'

interface UpdateOrderProps
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {
  items: {
    productId: string
    quantity: number
  }[]
}

export const updateOrderWithItems = async (
  id: string,
  data: UpdateOrderProps,
) => {
  try {
    const { items, ...orderData } = data

    return await prismadb.$transaction(async (prisma) => {
      const order = await prisma.order.update({
        where: {
          id,
        },
        data: {
          ...orderData,
        },
        include: {
          items: true,
        },
      })

      const itemsToDelete = order.items.filter(
        (item) =>
          !items.some((newItem) => newItem.productId === item.productId),
      )
      for (const item of itemsToDelete) {
        await prisma.item.delete({
          where: {
            id: item.id,
          },
        })
        if (order.state === ORDER_STATE.CANCELADO) {
          await incrementProductQuantity({
            prisma,
            productId: item.productId,
            quantity: item.quantity,
          })
        }
      }

      const itemsToCreate = items.filter(
        (newItem) =>
          !order.items.some((item) => item.productId === newItem.productId),
      )
      for (const item of itemsToCreate) {
        await prisma.item.create({
          data: {
            orderId: id,
            productId: item.productId,
            quantity: item.quantity,
          },
        })

        if (order.state === ORDER_STATE.CANCELADO) {
          await decrementProductQuantity({
            prisma,
            productId: item.productId,
            quantity: item.quantity,
          })
        }
      }

      if (order.state === ORDER_STATE.CANCELADO) {
        const itemsToUpdate = items.filter((newItem) =>
          order.items.some((item) => item.productId === newItem.productId),
        )

        console.log('itemsToUpdate', itemsToUpdate)

        for (const item of itemsToUpdate) {
          const oldItem = order.items.find(
            (oldItem) => oldItem.productId === item.productId,
          ) as Item

          console.log('oldItem', oldItem)

          if (order.state === ORDER_STATE.CANCELADO) {
            await decrementProductQuantity({
              prisma,
              productId: item.productId,
              quantity: item.quantity,
            })

            continue
          }

          if (oldItem.quantity === item.quantity) {
            continue
          }

          if (oldItem.quantity > item.quantity) {
            await incrementProductQuantity({
              prisma,
              productId: item.productId,
              quantity: oldItem.quantity - item.quantity,
            })
          } else {
            await decrementProductQuantity({
              prisma,
              productId: item.productId,
              quantity: item.quantity - oldItem.quantity,
            })
          }
        }
      }

      return order
    })
  } catch (error) {
    console.log('[ORDER_UPDATE]', error)
    return null
  }
}
