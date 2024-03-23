import { SizeForm } from '@/modules/sizes/admin/components/form'

import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { getSizeCategory } from '@/modules/sizes/shared/actions/get-size-category'
import { getSizes } from '@/modules/sizes/shared/actions/get-sizes'
import { Container } from '@/modules/shared/components/container'

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
    <Container>
      <SizeForm
        initialData={sizeCategory}
        categories={categories}
        sizes={sizes}
      />
    </Container>
  )
}

export default SizePage
