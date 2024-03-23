import { Category } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { CategoriesFilter } from './categories-filter'
import { useSizesFilters } from '../../../shared/store/filters'
import { MainGrid } from '@/modules/shared/components/main-grid'

export const SizesFilters = ({ categories }: { categories: Category[] }) => {
  const clearFilters = useSizesFilters((state) => state.clearFilters)

  return (
    <MainGrid>
      <CategoriesFilter categories={categories} />
      <Button
        variant='ghost'
        onClick={() => {
          clearFilters()
        }}
        className='w-[290px] bg-blue-100 hover:bg-blue-200 flex items-center justify-center gap-x-2 rounded-md transition-colors duration-200 ease-in-out'
      >
        Limpiar Filtros
        <Trash className='w-4 h-4' />
      </Button>
    </MainGrid>
  )
}
