import { getProductsByCategory } from '@/modules/products/shared/actions/get-products-by-category'
import { getSizesByCategory } from '@/modules/sizes/shared/actions/get-sizes-by-category'
import { getBrands } from '@/modules/brands/shared/actions/get-brands'
import { getColors } from '@/modules/colors/shared/actions/get-colors'
import { ProductsByCategoryClient } from '@/modules/products/customer/components/products-client'

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: {
    id: string
  }
  searchParams: {
    gender?: string
    brandId?: string
    sizeId?: string
    state?: string
    colorId?: string
  }
}) => {
  const productsMasters = await getProductsByCategory(params.id, searchParams)

  const sizesCategory = await getSizesByCategory(params.id)
  const sizes = sizesCategory.map((sizeCategory) => sizeCategory.size)

  const colors = await getColors()

  const brands = await getBrands()

  return (
    <ProductsByCategoryClient
      brands={brands}
      colors={colors}
      productsMasters={productsMasters}
      sizes={sizes}
    />
  )
}

export default CategoryPage
