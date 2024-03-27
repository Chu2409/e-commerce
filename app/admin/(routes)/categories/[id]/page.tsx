import { CategoryForm } from '@/modules/categories/admin/components/form'

import { getCategory } from '@/modules/categories/shared/actions/get-category'
import { getCategoriesMaster } from '@/modules/categories/shared/actions/get-categories-master'
import { Container } from '@/modules/shared/components/container'

const CategoryPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const category = await getCategory(params.id)
  const masterCategories = await getCategoriesMaster()

  return (
    <Container>
      <CategoryForm
        initialData={category}
        masterCategories={masterCategories}
      />
    </Container>
  )
}

export default CategoryPage
