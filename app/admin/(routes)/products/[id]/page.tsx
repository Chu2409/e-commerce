import ProductCard from '@/modules/products/admin/components/product-card'
import { FullProductForm } from '@/modules/products/admin/components/form'
import { Separator } from '@/components/ui/separator'

import { getBrands } from '@/modules/brands/shared/actions/get-brands'
import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { getColors } from '@/modules/colors/shared/actions/get-colors'
import { getMasterByProduct } from '@/modules/products/shared/actions/get-master-by-product'
import { getSizesByCategory } from '@/modules/sizes/shared/actions/get-sizes-by-category'

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
    <div className='flex flex-col p-8 pt-6'>
      <FullProductForm
        initialProductMaster={productMaster}
        selectedProductId={params.id}
        brands={brands}
        categories={categories}
        colors={colors}
        sizesCategories={sizesCategories}
      />

      <Separator className='mt-8 mb-4' />

      {productMaster && (
        <div>
          <div className='mb-4'>
            <h2 className='text-xl font-semibold tracking-tight'>
              Todas las variaciones
            </h2>
          </div>

          <div className='gap-y-8 gap-x-6 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 max-md:justify-items-center'>
            {productMaster?.productsColors.map((productColor) => (
              <ProductCard key={productColor.id} productColor={productColor} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage
