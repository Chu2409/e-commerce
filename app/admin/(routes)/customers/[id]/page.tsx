import { CustomerForm } from '@/modules/customers/admin/components/form'

import { getCustomer } from '@/modules/customers/shared/actions/get-customer'

const CustomerPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const customer = await getCustomer(params.id)

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <CustomerForm initialData={customer} />
      </div>
    </div>
  )
}

export default CustomerPage
