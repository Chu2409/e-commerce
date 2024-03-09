import { getCustomers } from '@/modules/admin/routes/customers/actions/get-customers'
import { getOrder } from '@/modules/admin/routes/orders/actions/get-order'
import { OrderForm } from '@/modules/admin/routes/orders/components/form'
import { ProductsSelector } from '@/modules/admin/routes/orders/components/products-selector'
import { getAllProductsAvailable } from '@/modules/admin/routes/products/actions/get-all-products-available'
import { ORDER_STATE } from '@prisma/client'

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
  const products = await getAllProductsAvailable()

  return (
    <div className='flex flex-col p-8 pt-6'>
      <OrderForm initialData={order} customers={customers} />

      {order == null || order.state === ORDER_STATE.GENERADO ? (
        <ProductsSelector products={products} />
      ) : null}
    </div>
  )
}

export default OrderPage
