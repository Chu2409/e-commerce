import { ColorsClient } from '@/modules/colors/admin/components/client'

import { getColors } from '@/modules/colors/shared/actions/get-colors'

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
