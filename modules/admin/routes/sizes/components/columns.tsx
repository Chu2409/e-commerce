'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { CellActions } from '@/modules/admin/components/cell-actions'
import { deleteSize } from '../actions/delete-size'
import { IFullSize } from '../interfaces/full-size'

export const brandsColumns: ColumnDef<IFullSize>[] = [
  {
    accessorKey: 'value',
    header: 'Valor',
    id: 'value',
    cell: ({ row }) => {
      return row.original.size.value
    },
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      return row.original.size.name
    },
    accessorFn: (row) => {
      return row.size.name
    },
  },
  {
    accessorKey: 'categoryId',
    header: 'Categoría',
    cell: ({ row }) => {
      return row.original.category.name
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
      return row.original.category.active ? 'Activo' : 'Inactivo'
    },
  },
  {
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => {
      return (
        <CellActions
          id={row.original.id}
          message='Talla/Tamaño eliminado'
          onDelete={deleteSize}
          errorMessage='Elimine los productos asociados a esta talla/tamaño primero'
          refresh
        />
      )
    },
  },
]
