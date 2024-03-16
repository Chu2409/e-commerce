import { Category } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { CategoriesFilter } from './categories-filter'
import { useSizesFilters } from '../../../shared/store/filters'

export const SizesFilters = ({ categories }: { categories: Category[] }) => {
  const clearFilters = useSizesFilters((state) => state.clearFilters)

  return (
    <div className='flex items-center justify-between'>
      <div className='grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 gap-x-4 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 gap-y-4 mb-4'>
        <CategoriesFilter categories={categories} />
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
