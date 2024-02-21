import { BrandsClient } from '@/modules/admin/routes/brands/components/client'

const BrandsPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <BrandsClient />
      </div>
    </div>
  )
}

export default BrandsPage
