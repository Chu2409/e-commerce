import { getCustomer } from '@/modules/admin/routes/customers/actions/get-customer'
import { CustomerForm } from '@/modules/admin/routes/customers/components/form'

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
