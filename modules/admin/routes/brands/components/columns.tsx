'use client'

import { Brand } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { CellActions } from '@/modules/admin/components/cell-actions'
import { deleteBrand } from '../actions/delete-brand'

export const brandsColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='font-bold m-0 p-0'
        >
          Nombre
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => (
      <CellActions
        id={row.original.id}
        message='Marca eliminada'
        onDelete={deleteBrand}
        errorMessage='Elimine los productos asociados a esta marca primero'
      />
    ),
  },
]
