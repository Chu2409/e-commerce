import { getCustomers } from '@/modules/admin/routes/customers/actions/get-customers'
import { getOrder } from '@/modules/admin/routes/orders/actions/get-order'
import { OrderForm } from '@/modules/admin/routes/orders/components/form'

export const revalidate = 0

const OrderPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const order = await getOrder(params.id)
  const customers = await getCustomers()

  return (
    <div className='flex flex-col p-8 pt-6'>
      <OrderForm initialData={order} customers={customers} />
    </div>
  )
}

export default OrderPage
