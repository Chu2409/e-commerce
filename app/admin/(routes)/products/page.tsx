import { ProductsClient } from '@/modules/products/admin/components/client'

import { getBrands } from '@/modules/brands/shared/actions/get-brands'
import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { getColors } from '@/modules/colors/shared/actions/get-colors'

export const revalidate = 0

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
