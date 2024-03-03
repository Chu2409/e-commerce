'use client'

import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { brandsColumns } from './columns'
import { DataTable } from '@/modules/admin/components/data-table'
import { getSizes } from '../actions/get-sizes'
import { Category } from '@prisma/client'
import { useEffect, useState } from 'react'
import { IFullSize } from '../interfaces/size'
import { useSizesFilters } from '../store/filters'
import { SizesFilters } from './filters/filters'

export const SizesClient = ({ categories }: { categories: Category[] }) => {
  const [data, setData] = useState<IFullSize[]>([])

  const filters = useSizesFilters((state) => state.filters)
  const setFilter = useSizesFilters((state) => state.setFilter)

  const skip = useSizesFilters((state) => state.filters.skip)
  const setSkip = (skip: number) => {
    setFilter({ key: 'skip', value: skip })
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSizes(filters)
      setData(data)
      console.log(filters)
    }

    fetchData()
  }, [filters])

  return (
    <div>
      <Header
        title='Tallas/Tamaños'
        description='Administra las tallas y tamaños'
        buttonLabel='Nueva Talla/Tamaño'
      />

      <Separator className='my-4' />

      <SizesFilters categories={categories} />

      <DataTable
        columns={brandsColumns}
        data={data}
        filters={{
          skip,
          setSkip,
        }}
      />
    </div>
  )
}
