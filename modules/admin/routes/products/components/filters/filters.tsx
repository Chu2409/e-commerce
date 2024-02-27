import { Brand, Category, Color } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useProductsFilters } from '../../store/filters'
import { StateFilter } from './state-filter'
import { BrandFilter } from './brand-filter'
import { CategoryFilter } from './category-filter'
import { SizeFilter } from './size-filter'
import { NameFilter } from './name-filter'
import { ColorFilter } from './color-filter'

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
    <div className='flex items-center justify-between '>
      <div className='grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 gap-x-4 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 gap-y-4 mb-4'>
        <NameFilter />
        <StateFilter />
        <BrandFilter brands={brands} />
        <CategoryFilter categories={categories} />
        <SizeFilter />
        <ColorFilter colors={colors} />

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
