import { getCategories } from '@/modules/admin/routes/categories/actions/get-categories'
import { SizesClient } from '@/modules/admin/routes/sizes/components/client'

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
