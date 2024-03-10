import { Customer } from '@prisma/client'
import { DateFilter } from './date-filter'
import { PayMethodFilter } from './pay-method-filter'
import { StateFilter } from './state-filter'
import { CustomerFilter } from './customer-filter'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useOrdersFilters } from '../../store/filters'

export const OrdersFilters = ({ customers }: { customers: Customer[] }) => {
  const clearFilters = useOrdersFilters((state) => state.clearFilters)

  return (
    <div className='flex items-center justify-between'>
      <div className='grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 gap-x-4 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 gap-y-4 mb-4'>
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
