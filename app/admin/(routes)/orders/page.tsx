import { OrdersClient } from '@/modules/orders/admin/components/client'

import { getCustomers } from '@/modules/customers/shared/actions/get-customers'

export const revalidate = 0

const OrdersPage = async () => {
  const customers = await getCustomers()

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <OrdersClient customers={customers} />
      </div>
    </div>
  )
}

export default OrdersPage
