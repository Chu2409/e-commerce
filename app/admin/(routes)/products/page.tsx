import { getBrands } from '@/modules/admin/routes/brands/actions/get-brands'
import { getCategories } from '@/modules/admin/routes/categories/actions/get-categories'
import { getColors } from '@/modules/admin/routes/colors/actions/get-colors'
import { ProductsClient } from '@/modules/admin/routes/products/components/client'

const ProductsPage = async () => {
  const brands = await getBrands()
  const categories = await getCategories()
  const colors = await getColors()

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <ProductsClient
          brands={brands}
          categories={categories}
          colors={colors}
        />
      </div>
    </div>
  )
}

export default ProductsPage
