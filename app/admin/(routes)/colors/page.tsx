import { getColors } from '@/modules/admin/routes/colors/actions/get-colors'
import { ColorsClient } from '@/modules/admin/routes/colors/components/client'

export const revalidate = 0

const ColorsPage = async () => {
  const colors = await getColors()

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <ColorsClient colors={colors} />
      </div>
    </div>
  )
}

export default ColorsPage
