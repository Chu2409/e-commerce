import { GroupProductCard } from '../../shared/components/group-product-card'
import { Button } from '@/components/ui/button'

import { IFullProductMaster } from '../../shared/interfaces/product'
import { MainGrid } from '@/modules/shared/components/main-grid'

interface ProductsListProps {
  productsMasters: IFullProductMaster[]
  filters: {
    skip: number
    setSkip: (skip: number) => void
  }
}

export const ProductsList = ({
  productsMasters,
  filters,
}: ProductsListProps) => {
  return (
    <div className='my-4'>
      {productsMasters.length === 0 && (
        <div className='flex items-center justify-center h-full w-full text-neutral-500 mt-10'>
          <p>No hay productos disponibles</p>
        </div>
      )}

      <MainGrid>
        {productsMasters.slice(0, 10).map((productMaster) => (
          <GroupProductCard
            key={productMaster.id}
            productMaster={productMaster}
            link='/admin/products/'
          />
        ))}
      </MainGrid>

      <div className='flex items-center justify-end gap-2 my-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => filters.setSkip(filters.skip - 10)}
          disabled={filters.skip === 0}
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => filters.setSkip(filters.skip + 10)}
          disabled={productsMasters.length !== 11}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
