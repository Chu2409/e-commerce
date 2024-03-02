'use server'

import prismadb from '@/lib/prismadb'
import { IOrdersFilters } from '../interfaces/order-filters'
import { IOrderWithCustomer } from '../interfaces/order-with-customer'

export const getOrders = async (
  filters?: IOrdersFilters,
): Promise<IOrderWithCustomer[]> => {
  try {
    const orders = await prismadb.order.findMany({
      where: {
        date: filters?.dateFrom,
        state: filters?.state,
        payMethod: filters?.payMethod,
        customerId: filters?.customerId,
      },
      include: {
        customer: true,
      },
      take: filters?.take || 11,
      skip: filters?.skip || 0,
    })

    // return orders.length ? orders : ordersE
    return orders
  } catch (error) {
    console.log('[ORDERS_GET]', error)
    return []
  }
}
