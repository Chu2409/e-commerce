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
import { GenderFilter } from './gender-filter'
import { MainGrid } from '@/modules/shared/components/main-grid'

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
    <MainGrid>
      <StateFilter />
      <GenderFilter />
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
    </MainGrid>
  )
}
