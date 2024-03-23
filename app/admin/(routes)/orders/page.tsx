import { OrdersClient } from '@/modules/orders/admin/components/client'

import { getCustomers } from '@/modules/customers/shared/actions/get-customers'
import { Container } from '@/modules/shared/components/container'

export const revalidate = 0

const OrdersPage = async () => {
  const customers = await getCustomers()

  return (
    <Container>
      <OrdersClient customers={customers} />
    </Container>
  )
}

export default OrdersPage
