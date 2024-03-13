import { getCategories } from '@/modules/admin/routes/categories/actions/get-categories'
import { getSizeCategory } from '@/modules/admin/routes/sizes/actions/get-size-category'
import { getSizes } from '@/modules/admin/routes/sizes/actions/get-sizes'
import { SizeForm } from '@/modules/admin/routes/sizes/components/form'

export const revalidate = 0

const SizePage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const sizeCategory = await getSizeCategory(params.id)
  const categories = await getCategories()
  const sizes = await getSizes()

  return (
    <div className='p-8 pt-6 grid'>
      <SizeForm
        initialData={sizeCategory}
        categories={categories}
        sizes={sizes}
      />
    </div>
  )
}

export default SizePage
