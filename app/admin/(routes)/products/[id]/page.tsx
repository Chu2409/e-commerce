import ProductCard from '@/modules/products/admin/components/product-card'
import { FullProductForm } from '@/modules/products/admin/components/form'
import { Separator } from '@/components/ui/separator'

import { getBrands } from '@/modules/brands/shared/actions/get-brands'
import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { getColors } from '@/modules/colors/shared/actions/get-colors'
import { getMasterByProduct } from '@/modules/products/shared/actions/get-master-by-product'
import { getSizesByCategory } from '@/modules/sizes/shared/actions/get-sizes-by-category'
import { Container } from '@/modules/shared/components/container'
import { MainGrid } from '@/modules/shared/components/main-grid'

export const revalidate = 0

const ProductPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const categories = await getCategories()
  const brands = await getBrands()
  const colors = await getColors()

  const productMaster = await getMasterByProduct(params.id)
  const sizesCategories = await getSizesByCategory(productMaster?.categoryId!)

  return (
    <Container>
      <FullProductForm
        initialProductMaster={productMaster}
        selectedProductId={params.id}
        brands={brands}
        categories={categories}
        colors={colors}
        sizesCategories={sizesCategories}
      />

      {productMaster && (
        <>
          <Separator className='mt-8 mb-4' />

          <h2 className='text-xl font-semibold tracking-tight mb-4'>
            Todas las variaciones
          </h2>

          <MainGrid>
            {productMaster?.productsColors.map((productColor) => (
              <ProductCard key={productColor.id} productColor={productColor} />
            ))}
          </MainGrid>
        </>
      )}
    </Container>
  )
}

export default ProductPage
