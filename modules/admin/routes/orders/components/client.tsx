'use client'

import { Separator } from '@/components/ui/separator'
import { DataTableWithFilters } from '@/modules/admin/components/data-table-with-filters'
import { Header } from '@/modules/admin/components/header'
import { ordersColumns } from './columns'
import { getOrders } from '../data/get-orders'
import { OrdersFilters } from './filters/filters'
import { useOrdersFilters } from '../store/filters'
import { Customer } from '@prisma/client'

export const OrdersClient = ({ customers }: { customers: Customer[] }) => {
  const filters = useOrdersFilters((state) => state.filters)

  return (
    <div>
      <Header
        title='Órdenes'
        description='Administra tus órdenes'
        buttonLabel='Nueva Órden'
      />

      <Separator className='my-4' />

      <OrdersFilters customers={customers} />

      <DataTableWithFilters
        columns={ordersColumns}
        filters={filters}
        getData={getOrders}
        visibility
      />
    </div>
  )
}
