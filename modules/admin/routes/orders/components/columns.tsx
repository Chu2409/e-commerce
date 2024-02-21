'use client'

import { formatDateHours, formatMoney } from '@/lib/utils'
import { Order } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { CellActions } from '@/modules/admin/components/cell-actions'

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='font-bold'
        >
          Fecha
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
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
    cell: ({ row }) => (
      <CellActions
        id={row.original.id}
        message='Órden eliminada'
        onDelete={(id) => Promise.resolve()}
      />
    ),
  },
]
