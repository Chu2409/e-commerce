import { SizesClient } from '@/modules/sizes/admin/components/client'

import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { Container } from '@/modules/shared/components/container'

export const revalidate = 0

const SizesPage = async () => {
  const categories = await getCategories()

  return (
    <Container>
      <SizesClient categories={categories} />
    </Container>
  )
}

export default SizesPage
