import { ORDER_STATE } from '@prisma/client'

import { OrderForm } from '@/modules/orders/admin/components/form'
import { ProductsSelector } from '@/modules/orders/admin/components/products-selector'

import { getOrder } from '@/modules/orders/shared/actions/get-order'
import { getCustomers } from '@/modules/customers/shared/actions/get-customers'
import { getProductsAvailable } from '@/modules/products/shared/actions/get-products-available'
import { Container } from '@/modules/shared/components/container'

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
  const products = await getProductsAvailable()

  return (
    <Container>
      <OrderForm initialData={order} customers={customers} />

      {order == null || order.state === ORDER_STATE.GENERADO ? (
        <ProductsSelector products={products} />
      ) : null}
    </Container>
  )
}

export default OrderPage
