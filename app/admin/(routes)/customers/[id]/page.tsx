import { CustomerForm } from '@/modules/customers/admin/components/form'

import { getCustomer } from '@/modules/customers/shared/actions/get-customer'
import { Container } from '@/modules/shared/components/container'

const CustomerPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const customer = await getCustomer(params.id)

  return (
    <Container>
      <CustomerForm initialData={customer} />
    </Container>
  )
}

export default CustomerPage
