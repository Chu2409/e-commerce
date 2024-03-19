import GroupProductCard from '../../shared/components/group-product-card'
import { Button } from '@/components/ui/button'

import { IFullProductMaster } from '../../shared/interfaces/product'

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
    <div className='mt-2'>
      {productsMasters.length === 0 && (
        <div className='flex items-center justify-center h-full w-full text-neutral-500 mt-10'>
          <p>No hay productos disponibles</p>
        </div>
      )}

      <div className='gap-y-8 gap-x-6 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 max-md:justify-items-center'>
        {productsMasters.map((productMaster) => (
          <GroupProductCard
            key={productMaster.id}
            productMaster={productMaster}
            link='/admin/products/'
          />
        ))}
      </div>

      <div className='flex items-center justify-end space-x-2 my-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => {}}
          disabled={filters.skip === 0}
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            filters.setSkip(filters.skip + 10)
          }}
          // disabled={data.length !== 11}
          disabled={productsMasters.length !== 11}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
