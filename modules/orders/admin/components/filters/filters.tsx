import { Customer } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { DateFilter } from './date-filter'
import { PayMethodFilter } from './pay-method-filter'
import { StateFilter } from './state-filter'
import { CustomerFilter } from './customer-filter'
import { useOrdersFilters } from '../../../shared/store/filters'
import { MainGrid } from '@/modules/shared/components/main-grid'

export const OrdersFilters = ({ customers }: { customers: Customer[] }) => {
  const clearFilters = useOrdersFilters((state) => state.clearFilters)

  return (
    <MainGrid>
      <DateFilter />
      <StateFilter />
      <PayMethodFilter />
      <CustomerFilter customers={customers} />
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
