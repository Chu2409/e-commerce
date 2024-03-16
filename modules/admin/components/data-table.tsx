'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  visibility?: boolean
  keySearch?: string
  filters?: {
    skip: number
    setSkip: (skip: number) => void
  }
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  visibility,
  keySearch,
  filters,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
  })

  return (
    <div>
      <div className='flex items-center py-2 justify-between'>
        {keySearch ? (
          <div className={cn('flex items-center py-2')}>
            <Input
              placeholder='Filtrar...'
              value={
                (table.getColumn(keySearch)?.getFilterValue() as string) ?? ''
              }
              onChange={(event) => {
                table.getColumn(keySearch)?.setFilterValue(event.target.value)
              }}
              className='w-[300px]'
            />
          </div>
        ) : null}

        <div
          className={cn(
            'flex items-center py-2 self-end ml-auto',
            visibility ? '' : 'hidden',
          )}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(e) => e.preventDefault()}
                    >
                      {(column.columnDef.meta as any)?.title ??
                        (column.columnDef.header as string)}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='font-bold'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-sm text-center'
                >
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            filters ? filters.setSkip(filters.skip - 10) : table.previousPage()
          }}
          disabled={filters ? filters.skip === 0 : !table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            filters ? filters.setSkip(filters.skip + 10) : table.nextPage()
          }}
          // disabled={data.length !== 11}
          disabled={filters ? data.length !== 11 : !table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
