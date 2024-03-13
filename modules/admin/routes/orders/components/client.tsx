'use client'

import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { ordersColumns } from './columns'
import { getOrders } from '../actions/get-orders'
import { OrdersFilters } from './filters/filters'
import { Customer } from '@prisma/client'
import { useOrdersFilters } from '../store/filters'
import { useEffect, useState } from 'react'
import { DataTable } from '@/modules/admin/components/data-table'
import { IFullOrder } from '../interfaces/order'

export const OrdersClient = ({ customers }: { customers: Customer[] }) => {
  const [data, setData] = useState<Omit<IFullOrder, 'items'>[]>([])

  const filters = useOrdersFilters((state) => state.filters)
  const setFilter = useOrdersFilters((state) => state.setFilter)

  const skip = useOrdersFilters((state) => state.filters.skip)
  const setSkip = (skip: number) => {
    setFilter({ key: 'skip', value: skip })
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrders(filters)
      setData(data)
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return (
    <div>
      <Header
        title='Órdenes'
        description='Administra tus órdenes'
        buttonLabel='Nueva Orden'
      />

      <Separator className='my-4' />

      <OrdersFilters customers={customers} />

      <DataTable
        columns={ordersColumns}
        data={data}
        visibility
        filters={{
          skip,
          setSkip,
        }}
      />
    </div>
  )
}
