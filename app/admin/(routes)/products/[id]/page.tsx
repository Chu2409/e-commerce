import { getBrands } from '@/modules/admin/routes/brands/actions/get-brands'
import { getCategories } from '@/modules/admin/routes/categories/actions/get-categories'
import { getColors } from '@/modules/admin/routes/colors/actions/get-colors'
import { getProduct } from '@/modules/admin/routes/products/actions/get-product'
import { ProductForm } from '@/modules/admin/routes/products/components/form'

export const revalidate = 0

const ProductPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const colors = await getColors()
  const categories = await getCategories()
  const brands = await getBrands()

  const product = await getProduct(params.id)

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <ProductForm
          initialData={product}
          brands={brands}
          categories={categories}
          colors={colors}
        />
      </div>
    </div>
  )
}

export default ProductPage
