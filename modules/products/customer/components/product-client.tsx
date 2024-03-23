import { IFullProductMaster } from '../../shared/interfaces/product'

import { GroupProductCard } from '@/modules/products/shared/components/group-product-card'
import { ProductInfo } from './product-info'
import { Separator } from '@/components/ui/separator'

interface ProductClientProps {
  productMaster: IFullProductMaster
  relatedProducts: IFullProductMaster[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
  productMaster,
  relatedProducts,
}) => {
  return (
    <div className='px-8 py-10 flex flex-col gap-6'>
      <ProductInfo productMaster={productMaster} />

      <Separator className='my-4' />

      <div>
        <h2 className='text-xl font-semibold tracking-tight mb-4'>
          Productos relacionados
        </h2>

        <div className='grid gap-4 max-[700px]:justify-items-center min-[700px]:grid-cols-2 lg:grid-cols-3 min-[1300px]:grid-cols-4 min-[1650px]:grid-cols-5'>
          {relatedProducts.map((productMaster) => (
            <GroupProductCard
              key={productMaster.id}
              productMaster={productMaster}
              link='/product/'
            />
          ))}
        </div>
      </div>
    </div>
  )
}
