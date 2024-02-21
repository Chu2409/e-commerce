'use server'

import prismadb from '@/lib/prismadb'
import { Order } from '@prisma/client'
import { IOrdersFilters } from '../interfaces/order-filters'

const ordersE: Order[] = [
  {
    id: '1',
    date: new Date(),
    state: 'PENDIENTE',
    payMethod: 'EFECTIVO',
    payLimit: new Date(),
    valuePaid: 10000,
    total: 20000,
    finalTotal: 19000,
    customerId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const getOrders = async (filters?: IOrdersFilters): Promise<Order[]> => {
  try {
    const orders = await prismadb.order.findMany({
      where: {
        date: filters?.dateFrom,
        state: filters?.state,
        payMethod: filters?.payMethod,
        customerId: filters?.customerId,
      },
    })

    return orders.length ? orders : ordersE
  } catch (error) {
    console.log('[ORDERS_GET]', error)
  }

  return []
}
