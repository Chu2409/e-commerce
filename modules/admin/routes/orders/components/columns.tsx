'use client'

import { formatDateHours, formatMoney } from '@/lib/utils'
import { Order } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { OrdersCellActions } from './cell-actions'

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = row.original.date
      if (date == null) return
      return <div>{formatDateHours(date)}</div>
    },
  },
  {
    accessorKey: 'state',
    header: 'Estado',
  },
  {
    accessorKey: 'payMethod',
    header: 'Forma de pago',
  },
  {
    accessorKey: 'payLimit',
    header: 'Fecha límite',
    cell: ({ row }) => {
      const date = row.original.payLimit
      if (date == null) return
      return <div>{formatDateHours(date)}</div>
    },
  },
  {
    accessorKey: 'valuePaid',
    header: 'Valor cancelado',
    cell: ({ row }) => {
      const data = row.original.valuePaid
      if (data == null) return
      const amount = parseFloat(String(data))

      return <div>{formatMoney(amount)}</div>
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const data = row.original.total
      if (data == null) return
      const amount = parseFloat(String(data))

      return <div>{formatMoney(amount)}</div>
    },
  },
  {
    accessorKey: 'finalTotal',
    header: 'Total final',
    cell: ({ row }) => {
      const data = row.original.finalTotal
      if (data == null) return
      const amount = parseFloat(String(data))

      return <div>{formatMoney(amount)}</div>
    },
  },
  {
    accessorKey: 'customerId',
    header: 'Cliente',
  },
  {
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => <OrdersCellActions order={row.original} />,
  },
]
