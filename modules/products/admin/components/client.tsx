'use client'

import { useEffect, useState } from 'react'
import { Brand, Category, Color } from '@prisma/client'

import { ProductsFilters } from './filters/filters'
import { ProductsList } from './products-list'
import { Header } from '@/modules/admin/components/header'
import { Separator } from '@/components/ui/separator'

import { IFullProductMaster } from '../../shared/interfaces/product'
import { useProductsFilters } from '../../shared/store/filters'
import { getProducts } from '../../shared/actions/get-products-si'

export const ProductsClient = ({
  brands,
  categories,
  colors,
}: {
  brands: Brand[]
  categories: Category[]
  colors: Color[]
}) => {
  const [data, setData] = useState<IFullProductMaster[]>([])

  const filters = useProductsFilters((state) => state.filters)

  const skip = useProductsFilters((state) => state.filters.skip)
  const setFilter = useProductsFilters((state) => state.setFilter)
  const setSkip = (skip: number) => {
    setFilter({ key: 'skip', value: skip })
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts(filters)
      setData(data)
    }

    fetchData().catch(console.error)
  }, [filters])

  return (
    <div>
      <Header
        title='Productos'
        description='Administra tus productos'
        buttonLabel='Nuevo'
      />

      <Separator className='my-4' />

      <ProductsFilters
        brands={brands}
        categories={categories}
        colors={colors}
      />

      <ProductsList
        productsMasters={data}
        filters={{
          skip,
          setSkip,
        }}
      />
    </div>
  )
}
