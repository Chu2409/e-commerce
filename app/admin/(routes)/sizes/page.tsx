import { SizesClient } from '@/modules/sizes/admin/components/client'

import { getCategories } from '@/modules/categories/shared/actions/get-categories'

export const revalidate = 0

const SizesPage = async () => {
  const categories = await getCategories()

  return (
    <div className='p-8 pt-6 flex flex-col flex-1'>
      <SizesClient categories={categories} />
    </div>
  )
}

export default SizesPage
