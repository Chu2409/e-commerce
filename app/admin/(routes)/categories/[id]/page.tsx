import { CategoryForm } from '@/modules/categories/admin/components/form'

import { getCategory } from '@/modules/categories/shared/actions/get-category'

const CategoryPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const category = await getCategory(params.id)

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <CategoryForm initialData={category} />
      </div>
    </div>
  )
}

export default CategoryPage
