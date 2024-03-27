'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { CellActions } from '@/modules/admin/components/cell-actions'
import { ArrowUpDown } from 'lucide-react'

import { deleteCategory } from '../../shared/actions/delete-category'
import { IFullCategory } from '../../shared/interfaces/categories'

export const categoriesColumns: ColumnDef<IFullCategory>[] = [
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
    accessorKey: 'masterCategory',
    header: 'Categoría Maestra',
    cell: ({ row }) => {
      return row.original.masterCategory?.name
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
        errorMessage='Elimine los productos o tallas asociados a esta categoría primero'
      />
    ),
  },
]
