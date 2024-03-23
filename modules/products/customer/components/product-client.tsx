import { IFullProductMaster } from '../../shared/interfaces/product'

import { GroupProductCard } from '@/modules/products/shared/components/group-product-card'
import { ProductInfo } from './product-info'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/modules/shared/components/container'
import { MainGrid } from '@/modules/shared/components/main-grid'

interface ProductClientProps {
  productMaster: IFullProductMaster
  relatedProducts: IFullProductMaster[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
  productMaster,
  relatedProducts,
}) => {
  return (
    <Container>
      <ProductInfo productMaster={productMaster} />

      <Separator className='my-6' />

      <div>
        <h2 className='text-xl font-semibold tracking-tight mb-4'>
          Productos relacionados
        </h2>

        <MainGrid>
          {relatedProducts.map((productMaster) => (
            <GroupProductCard
              key={productMaster.id}
              productMaster={productMaster}
              link='/product/'
            />
          ))}
        </MainGrid>
      </div>
    </Container>
  )
}
