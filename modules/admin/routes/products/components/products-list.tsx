import { Button } from '@/components/ui/button'
import { IFullProduct } from '../interfaces/full-product'
import ProductCard from './product-card'

interface ProductsListProps {
  products: IFullProduct[]
  filters: {
    skip: number
    setSkip: (skip: number) => void
  }
}

export const ProductsList = ({ products, filters }: ProductsListProps) => {
  return (
    <div className='mt-2'>
      <div className='flex items-center justify-end space-x-2'>
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
          disabled={products.length !== 11}
        >
          Siguiente
        </Button>
      </div>

      {products.length === 0 && (
        <div className='flex items-center justify-center h-full w-full text-neutral-500 mt-10'>
          No results
        </div>
      )}

      <div className='flex flex-wrap gap-x-6 gap-y-4'>
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
}
