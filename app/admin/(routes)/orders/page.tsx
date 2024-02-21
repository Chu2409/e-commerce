import { getCustomers } from '@/modules/admin/routes/customers/data/get-customers'
import { OrdersClient } from '@/modules/admin/routes/orders/components/client'

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
