'use client'

import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/modules/admin/components/data-table'
import { Header } from '@/modules/admin/components/header'
import { ordersColumns } from './columns'
import { getOrders } from '../data/get-orders'
import { OrdersFilters } from './filters/filters'
import { useFiltersStore } from '../store/filters'
import { Customer } from '@prisma/client'

export const OrdersClient = ({ customers }: { customers: Customer[] }) => {
  const filters = useFiltersStore((state) => state.filters)

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
        columns={ordersColumns}
        filters={filters}
        getData={getOrders}
      />
    </div>
  )
}
