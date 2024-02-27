import { ColorsClient } from '@/modules/admin/routes/colors/components/client'

const ColorsPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <ColorsClient />
      </div>
    </div>
  )
}

export default ColorsPage
