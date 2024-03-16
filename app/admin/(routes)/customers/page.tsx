import { CustomersClient } from '@/modules/customers/admin/components/client'

import { getCustomers } from '@/modules/customers/shared/actions/get-customers'

export const revalidate = 0

const CustomersPage = async () => {
  const customers = await getCustomers()

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <CustomersClient customers={customers} />
      </div>
    </div>
  )
}

export default CustomersPage
