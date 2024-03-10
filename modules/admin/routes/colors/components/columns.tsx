'use client'

import { Color } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { CellActions } from '@/modules/admin/components/cell-actions'
import { deleteColor } from '../actions/delete-color'

export const colorsColumns: ColumnDef<Color>[] = [
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
    accessorKey: 'value',
    header: 'Valor',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      return (
        <div
          className='w-full h-8 rounded-md'
          style={{ backgroundColor: row.original.value }}
        />
      )
    },
  },
  {
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => (
      <CellActions
        id={row.original.id}
        message='Color eliminado'
        onDelete={deleteColor}
        errorMessage='Elimine los productos asociados a este color primero'
      />
    ),
  },
]
