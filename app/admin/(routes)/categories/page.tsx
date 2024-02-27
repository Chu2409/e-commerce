import { getCategories } from '@/modules/admin/routes/categories/actions/get-categories'
import { CategoriesClient } from '@/modules/admin/routes/categories/components/client'

export const revalidate = 0

const CategoriesPage = async () => {
  const categories = await getCategories()

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <CategoriesClient categories={categories} />
      </div>
    </div>
  )
}

export default CategoriesPage
