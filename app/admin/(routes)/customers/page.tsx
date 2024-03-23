import { CustomersClient } from '@/modules/customers/admin/components/client'

import { getCustomers } from '@/modules/customers/shared/actions/get-customers'
import { Container } from '@/modules/shared/components/container'

export const revalidate = 0

const CustomersPage = async () => {
  const customers = await getCustomers()

  return (
    <Container>
      <CustomersClient customers={customers} />
    </Container>
  )
}

export default CustomersPage
