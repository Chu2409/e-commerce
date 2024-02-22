import { getCategory } from '@/modules/admin/routes/categories/actions/get-category'
import { CategoryForm } from '@/modules/admin/routes/categories/components/form'

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
