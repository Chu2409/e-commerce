'use client'

import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { getProducts } from '../actions/get-products'
import { Brand, Category, Color } from '@prisma/client'
import { useProductsFilters } from '../store/filters'
import { useEffect, useState } from 'react'
import { IFullProduct } from '../interfaces/full-product'
import { IFullSize } from '../../sizes/interfaces/full-size'
import { ProductsFilters } from './filters/filters'

export const ProductsClient = ({
  brands,
  categories,
  colors,
}: {
  brands: Brand[]
  categories: Category[]
  color: Color[]
}) => {
  const [data, setData] = useState<IFullProduct[]>([])

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
    </div>
  )
}
