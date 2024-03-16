import { Brand, Category, Color } from '@prisma/client'
import { StateFilter } from './state-filter'
import { BrandFilter } from './brand-filter'
import { CategoryFilter } from './category-filter'
import { SizeFilter } from './size-filter'
import { NameFilter } from './name-filter'
import { ColorFilter } from './color-filter'

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { useProductsFilters } from '../../../shared/store/filters'

export const ProductsFilters = ({
  brands,
  categories,
  colors,
}: {
  brands: Brand[]
  categories: Category[]
  colors: Color[]
}) => {
  const clearFilters = useProductsFilters((state) => state.clearFilters)

  return (
    <div className='flex items-center justify-between'>
      <div className='w-full gap-y-4 gap-x-4 mb-4 grid grid-cols-1 max-[700px]:justify-items-center min-[700px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        <StateFilter />
        <BrandFilter brands={brands} />
        <CategoryFilter categories={categories} />
        <SizeFilter />
        <ColorFilter colors={colors} />
        <NameFilter />

        <Button
          variant='ghost'
          onClick={() => {
            clearFilters()
          }}
          className='w-[200px] bg-blue-100 hover:bg-blue-200 flex items-center justify-center gap-x-2 rounded-md transition-colors duration-200 ease-in-out'
        >
          Limpiar Filtros
          <Trash className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}
