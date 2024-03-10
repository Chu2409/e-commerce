'use server'

import prismadb from '@/lib/prismadb'
import { ORDER_STATE, Order, PAY_METHOD } from '@prisma/client'
import { decrementProductQuantity } from '../utils/decrement-product-quantity'

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
      const order = await prisma.order.findUnique({
        where: {
          id,
        },
      })

      const orderUpdated = await prisma.order.update({
        where: {
          id,
        },
        data: {
          ...orderData,
          payMethod:
            orderData.state === ORDER_STATE.GENERADO
              ? null
              : orderData.payMethod || PAY_METHOD.EFECTIVO,
        },
      })
      console.log('1')

      if (orderData.state === ORDER_STATE.GENERADO) {
        console.log('2')

        await prisma.order.update({
          where: {
            id,
          },
          data: {
            items: {
              deleteMany: {},
            },
          },
        })

        await prisma.order.update({
          where: {
            id,
          },
          data: {
            items: {
              createMany: {
                data: items.map(({ productId, quantity }) => ({
                  productId,
                  quantity,
                })),
              },
            },
          },
        })
      } else {
        console.log('3')

        if (
          order?.state === ORDER_STATE.PENDIENTE ||
          order?.state === ORDER_STATE.FINALIZADO
        )
          return orderUpdated

        console.log('4')

        for (const { productId, quantity } of items) {
          const product = await prisma.product.findUnique({
            where: { id: productId },
          })

          await prisma.item.updateMany({
            where: {
              productId,
              orderId: id,
            },
            data: {
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

      return orderUpdated
    })
  } catch (error) {
    console.log('[ORDER_UPDATE]', error)
    return null
  }
}
