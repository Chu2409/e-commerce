'use client'

import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { Brand, Category, Color } from '@prisma/client'
import { ProductsFilters } from './filters/filters'
import { useEffect, useState } from 'react'
import { IFullProductMaster } from '../interfaces/full-product'
import { useProductsFilters } from '../store/filters'
import { getProducts } from '../actions/get-products'
import { ProductsList } from './products-list'

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
      console.log(filters)
    }

    fetchData()
  }, [filters])

  return (
    <div>
      <Header
        title='Productos'
        description='Administra tus productos'
        buttonLabel='Nuevo Producto'
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
