import { getOrder } from '@/modules/admin/routes/orders/actions/get-order'

const OrderPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const order = await getOrder(params.id)

  return <div>Order Page</div>
}

export default OrderPage
