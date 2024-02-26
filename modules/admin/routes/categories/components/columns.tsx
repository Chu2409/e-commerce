'use client'

import { Brand } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { CellActions } from '@/modules/admin/components/cell-actions'
import { deleteCategory } from '../actions/delete-category'

export const categoriesColumns: ColumnDef<Brand>[] = [
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
    accessorKey: 'active',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='font-bold m-0 p-0'
        >
          Estado
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.active ? 'Activo' : 'Inactivo'
    },
  },
  {
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => (
      <CellActions
        id={row.original.id}
        message='Marca eliminada'
        onDelete={deleteCategory}
        errorMessage='Elimine los productos asociados a esta marca primero'
      />
    ),
  },
]
