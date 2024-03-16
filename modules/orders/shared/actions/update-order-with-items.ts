'use server'

import prismadb from '@/lib/prismadb'
import { ORDER_STATE, Order, PAY_METHOD } from '@prisma/client'
import { decrementProductQuantity } from '../utils/decrement-product-quantity'

interface UpdateOrderProps
  extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {
  items: {
    productId: string
    quantity: number
    delivered?: boolean
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

      if (orderData.state === ORDER_STATE.GENERADO) {
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
        if (
          order?.state === ORDER_STATE.PENDIENTE ||
          order?.state === ORDER_STATE.FINALIZADO
        ) {
          for (const { productId, delivered } of items) {
            await prisma.item.updateMany({
              where: {
                productId,
                orderId: id,
              },
              data: {
                delivered:
                  orderData.state === ORDER_STATE.FINALIZADO ? true : delivered,
              },
            })
          }
          return orderUpdated
        }

        for (const { productId, quantity, delivered } of items) {
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
              delivered:
                orderData.state === ORDER_STATE.FINALIZADO ? true : delivered,
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
  } catch (error: any) {
    console.log('[UPDATE_ORDER_WITH_ITEMS]', error.message)
    return null
  }
}
