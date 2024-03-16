'use client'

import { Customer } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { CellActions } from '@/modules/admin/components/cell-actions'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

import { deleteCustomer } from '../../shared/actions/delete-customer'

export const customersColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'dni',
    header: 'Cédula',
  },
  {
    accessorKey: 'firstName',
    header: 'Nombre',
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='font-bold m-0 p-0'
        >
          Apellido
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Teléfono',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },
  {
    accessorKey: 'city',
    header: 'Ciudad',
  },
  {
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => (
      <CellActions
        id={row.original.id}
        message='Cliente eliminado'
        onDelete={deleteCustomer}
        errorMessage='Elimine las órdenes asociados a este cliente primero'
      />
    ),
  },
]
