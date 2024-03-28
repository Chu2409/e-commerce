import { CategoriesClient } from '@/modules/categories/admin/components/client'

import { getFullCategories } from '@/modules/categories/shared/actions/get-full-categories'
import { Container } from '@/modules/shared/components/container'

export const revalidate = 0

const CategoriesPage = async () => {
  const categories = await getFullCategories()

  return (
    <Container>
      <CategoriesClient categories={categories} />
    </Container>
  )
}

export default CategoriesPage
