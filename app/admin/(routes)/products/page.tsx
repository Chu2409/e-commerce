import { ProductsClient } from '@/modules/products/admin/components/client'

import { getBrands } from '@/modules/brands/shared/actions/get-brands'
import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { getColors } from '@/modules/colors/shared/actions/get-colors'
import { Container } from '@/modules/shared/components/container'

export const revalidate = 0

const ProductsPage = async () => {
  const brands = await getBrands()
  const categories = await getCategories()
  const colors = await getColors()

  return (
    <Container>
      <ProductsClient brands={brands} categories={categories} colors={colors} />
    </Container>
  )
}

export default ProductsPage
