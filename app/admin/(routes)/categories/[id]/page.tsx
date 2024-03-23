import { CategoryForm } from '@/modules/categories/admin/components/form'

import { getCategory } from '@/modules/categories/shared/actions/get-category'
import { Container } from '@/modules/shared/components/container'

const CategoryPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const category = await getCategory(params.id)

  return (
    <Container>
      <CategoryForm initialData={category} />
    </Container>
  )
}

export default CategoryPage
