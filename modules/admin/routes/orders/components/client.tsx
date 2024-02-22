'use client'

import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { getOrdersColumns } from './columns'
import { getOrders } from '../actions/get-orders'
import { OrdersFilters } from './filters/filters'
import { Customer, Order } from '@prisma/client'
import { useOrdersFilters } from '../store/filters'
import { useEffect, useState } from 'react'
import { DataTable } from '@/modules/admin/components/data-table'

export const OrdersClient = ({ customers }: { customers: Customer[] }) => {
  const [data, setData] = useState<Order[]>([])

  const filters = useOrdersFilters((state) => state.filters)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrders(filters)
      setData(data)
      console.log(filters)
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return (
    <div>
      <Header
        title='Órdenes'
        description='Administra tus órdenes'
        buttonLabel='Nueva Órden'
      />

      <Separator className='my-4' />

      <OrdersFilters customers={customers} />

      <DataTable
        columns={getOrdersColumns(customers)}
        data={data}
        visibility
        keySearch='s'
      />
    </div>
  )
}
