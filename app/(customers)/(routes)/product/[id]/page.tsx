import { ProductClient } from '@/modules/products/customer/components/product-client'
import { getMasterByProduct } from '@/modules/products/shared/actions/get-master-by-product'
import { getProductsRelated } from '@/modules/products/shared/actions/get-products-related'

const ProductPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const productMaster = await getMasterByProduct(params.id)

  const relatedProducts = await getProductsRelated(
    productMaster?.categoryId || '',
  )

  return (
    <ProductClient
      productMaster={productMaster!}
      relatedProducts={relatedProducts}
    />
  )
}

export default ProductPage
