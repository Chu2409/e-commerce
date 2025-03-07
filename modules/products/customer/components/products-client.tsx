import { Brand, Color, Size } from '@prisma/client'

import { IFullProductMaster } from '../../shared/interfaces/product'

import { GroupProductCard } from '@/modules/products/shared/components/group-product-card'
import SizeFilter from '@/modules/products/customer/components/filters/size-filter'
// import ColorFilter from '@/modules/products/customer/components/filters/color-filter'
import BrandFilter from '@/modules/products/customer/components/filters/brand-filter'
import StateFilter from './filters/state-filter'
import MobileFilters from './filters/mobile-filters'
import GenderFilter from './filters/gender-filter'
import { Container } from '@/modules/shared/components/container'
import ColorFilter from './filters/color-filter'

interface ProductsByCategoryClientProps {
  productsMasters: IFullProductMaster[]
  sizes: Size[]
  colors: Color[]
  brands: Brand[]
}

export const ProductsByCategoryClient: React.FC<
  ProductsByCategoryClientProps
> = ({ brands, colors, productsMasters, sizes }) => {
  return (
    <Container>
      <div className='grid lg:grid-cols-[300px_1fr] gap-8 w-full'>
        <MobileFilters sizes={sizes} colors={colors} brands={brands} />

        <div className='max-lg:hidden'>
          {productsMasters.some((product) => product.gender) && (
            <GenderFilter valueKey='gender' name='Género' />
          )}

          {brands.length > 0 && (
            <BrandFilter valueKey='brandId' name='Marcas' data={brands} />
          )}

          {sizes.length > 0 && (
            <SizeFilter valueKey='sizeId' name='Tallas/Tamaños' data={sizes} />
          )}

          {colors.length > 0 && (
            <ColorFilter valueKey='colorId' name='Colores' data={colors} />
          )}

          <StateFilter valueKey='state' name='Estado' />
        </div>

        <div>
          {productsMasters.length === 0 && (
            <div className='flex items-center justify-center text-neutral-500 mt-10'>
              <p>No hay productos disponibles</p>
            </div>
          )}

          <div className='grid gap-4 justify-items-center min-[700px]:grid-cols-2 min-[1340px]:grid-cols-3 min-[1660px]:grid-cols-4 '>
            {productsMasters.map((productMaster) => (
              <GroupProductCard
                key={productMaster.id}
                productMaster={productMaster}
                link='/product/'
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
