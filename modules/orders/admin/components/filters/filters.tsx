import { Customer } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

import { DateFilter } from './date-filter'
import { PayMethodFilter } from './pay-method-filter'
import { StateFilter } from './state-filter'
import { CustomerFilter } from './customer-filter'
import { useOrdersFilters } from '../../../shared/store/filters'

export const OrdersFilters = ({ customers }: { customers: Customer[] }) => {
  const clearFilters = useOrdersFilters((state) => state.clearFilters)

  return (
    <div className='flex items-center justify-between'>
      <div className='w-full gap-y-4 gap-x-4 mb-4 grid grid-cols-1 max-[700px]:justify-items-center min-[700px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        <DateFilter />
        <StateFilter />
        <PayMethodFilter />
        <CustomerFilter customers={customers} />
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
