import { BrandForm } from '@/modules/admin/routes/brands/components/form'
import { getBrand } from '@/modules/admin/routes/brands/actions/get-brand'

const BrandPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const brand = await getBrand(params.id)

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <BrandForm initialData={brand} />
      </div>
    </div>
  )
}

export default BrandPage
