'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellActions } from '@/modules/admin/components/cell-actions'

import { IFullSize } from '../../shared/interfaces/size'
import { deleteSizeCategory } from '../../shared/actions/delete-size-category'

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
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => {
      return (
        <CellActions
          id={row.original.id}
          message='Talla/Tamaño eliminado'
          onDelete={deleteSizeCategory}
          errorMessage='Elimine los productos asociados a esta talla/tamaño primero'
          refresh
        />
      )
    },
  },
]
