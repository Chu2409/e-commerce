'use server'

import prismadb from '@/lib/prismadb'
import { IOrdersFilters } from '../interfaces/order-filters'
import { IFullOrder } from '../interfaces/order'

export const getOrders = async (
  filters?: IOrdersFilters,
): Promise<Omit<IFullOrder, 'items'>[]> => {
  try {
    const orders = await prismadb.order.findMany({
      where: {
        date: {
          gte: filters?.dateFrom,
          lte: filters?.dateTo,
        },
        state: filters?.state,
        payMethod: filters?.payMethod,
        customerId: filters?.customerId,
      },
      include: {
        customer: true,
      },
      take: filters?.take || 11,
      skip: filters?.skip || 0,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // return orders.length ? orders : ordersE
    return orders
  } catch (error) {
    console.log('[ORDERS_GET]', error)
    return []
  }
}
