import { Button } from '@/components/ui/button'
import ProductCard from './product-card'
import { IFullProductMaster } from '../interfaces/full-product'

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
          No results
        </div>
      )}

      <div className='gap-y-8 gap-x-6 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 max-md:justify-items-center'>
        {productsMasters.map((productMaster) => (
          <ProductCard key={productMaster.id} productsMasters={productMaster} />
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
            filters.setSkip(filters.skip + 15)
          }}
          // disabled={data.length !== 11}
          disabled={productsMasters.length !== 16}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
