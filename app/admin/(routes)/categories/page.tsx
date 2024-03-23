import { CategoriesClient } from '@/modules/categories/admin/components/client'

import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { Container } from '@/modules/shared/components/container'

export const revalidate = 0

const CategoriesPage = async () => {
  const categories = await getCategories()

  return (
    <Container>
      <CategoriesClient categories={categories} />
    </Container>
  )
}

export default CategoriesPage
