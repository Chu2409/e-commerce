import { Separator } from '@/components/ui/separator'
import { getBrands } from '@/modules/admin/routes/brands/actions/get-brands'
import { getCategories } from '@/modules/admin/routes/categories/actions/get-categories'
import { getProductsByMaster } from '@/modules/admin/routes/products/actions/get-products-by-master'
import { FullProductForm } from '@/modules/admin/routes/products/components/form'

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

  const product = await getProductsByMaster(params.id)

  return (
    <div className='flex flex-col p-8 pt-6'>
      <FullProductForm
        initialData={product}
        brands={brands}
        categories={categories}
      />

      {/* <Separator className='mt-8 mb-4' /> */}

      {/* <div className='mb-4'>
        <h2 className='text-xl font-bold tracking-tight'>Variaciones</h2>
        <p className='text-sm text-muted-foreground'>
          Todos las variaciones de este producto
        </p>
      </div>

      <div className='gap-y-8 gap-x-6 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 max-md:justify-items-center'>
        {productMaster?.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            id={productMaster.id}
            name={productMaster.name}
            brand={productMaster.brand.name}
            category={productMaster.category.name}
          />
        ))}
      </div> */}
    </div>
  )
}

export default ProductPage
