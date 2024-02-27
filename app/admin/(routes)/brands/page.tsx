import { getBrands } from '@/modules/admin/routes/brands/actions/get-brands'
import { BrandsClient } from '@/modules/admin/routes/brands/components/client'

export const revalidate = 0

const BrandsPage = async () => {
  const brands = await getBrands()

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <BrandsClient brands={brands} />
      </div>
    </div>
  )
}

export default BrandsPage
