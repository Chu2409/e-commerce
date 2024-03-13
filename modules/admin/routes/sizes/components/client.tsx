'use client'

import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { brandsColumns } from './columns'
import { DataTable } from '@/modules/admin/components/data-table'
import { getSizesCategories } from '../actions/get-sizes-categories'
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
      const data = await getSizesCategories(filters)
      setData(data)
    }

    fetchData()
  }, [filters])

  return (
    <div>
      <Header
        title='Tallas y Tamaños'
        description='Administra las tallas y tamaños'
        buttonLabel='Nuevo'
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
