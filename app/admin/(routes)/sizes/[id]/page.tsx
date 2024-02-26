import { getCategories } from '@/modules/admin/routes/categories/actions/get-categories'
import { getSize } from '@/modules/admin/routes/sizes/actions/get-size'
import { SizeForm } from '@/modules/admin/routes/sizes/components/form'

const SizePage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const size = await getSize(params.id)
  const categories = await getCategories()

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <SizeForm initialData={size} categories={categories} />
      </div>
    </div>
  )
}

export default SizePage
