import { BrandsClient } from '@/modules/brands/admin/components/client'

import { getBrands } from '@/modules/brands/shared/actions/get-brands'

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
