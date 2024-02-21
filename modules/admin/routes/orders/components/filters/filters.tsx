import { Customer } from '@prisma/client'
import { DateFilter } from './date-filter'
import { PayMethodFilter } from './pay-method-filter'
import { StateFilter } from './state-filter'
import { CustomerFilter } from './customer-filter'

export const OrdersFilters = ({ customers }: { customers: Customer[] }) => {
  return (
    <div className='flex'>
      <div className='grid grid-cols-4 max-xl:grid-cols-3 gap-x-4 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 mb-4 gap-y-4 '>
        <DateFilter />
        <StateFilter />
        <PayMethodFilter />
        <CustomerFilter customers={customers} />
      </div>
    </div>
  )
}
