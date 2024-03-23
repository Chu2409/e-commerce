'use client'

import { useEffect, useState } from 'react'
import { Category } from '@prisma/client'
import { brandsColumns } from './columns'

import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'

import { SizesFilters } from './filters/filters'
import { IFullSize } from '../../shared/interfaces/size'
import { useSizesFilters } from '../../shared/store/filters'
import { getSizesCategories } from '../../shared/actions/get-sizes-categories'

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
        buttonLabel='Nueva Talla/Tamaño'
      />

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
