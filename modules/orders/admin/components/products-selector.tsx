'use client'

import { useEffect, useState } from 'react'
import { formatMoney } from '@/lib/utils'

import { CldImage } from 'next-cloudinary'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { ShoppingCart } from 'lucide-react'

import { IFullProductOrder } from '../../shared/interfaces/order'
import { useItems } from '../../shared/store/items'

interface ProductsSelectorProps {
  products: IFullProductOrder[]
}

export const ProductsSelector: React.FC<ProductsSelectorProps> = ({
  products,
}) => {
  const items = useItems((state) => state.productItems)
  const addItem = useItems((state) => state.addProductItem)

  const [filteredProducts, setFilteredProducts] = useState(() =>
    products.filter(
      (product) => !items.find((item) => item.product.id === product.id),
    ),
  )

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) => !items.find((item) => item.product.id === product.id),
      ),
    )
  }, [items, products])

  return (
    <div className='mt-8'>
      <h2 className='text-lg font-medium tracking-tight mb-2'>
        Productos disponibles
      </h2>

      <Command
        className='rounded-lg border shadow-md'
        filter={(value, search) => {
          const name = value.split('_')[1]

          if (name.toLowerCase().includes(search.toLowerCase())) return 1

          return 0
        }}
      >
        <CommandInput placeholder='Buscar producto......' />
        <CommandList className='min-h-[500px] overflow-y-auto'>
          <CommandEmpty>Producto no encontrado</CommandEmpty>
          <CommandGroup>
            {filteredProducts.map((product) => (
              <CommandItem
                key={product.id}
                value={
                  product.id + '_' + product.productColor.productMaster.name
                }
                onSelect={() => {
                  addItem({
                    product,
                    quantity: 1,
                    delivered: false,
                    state: product.state,
                  })
                }}
                className='cursor-pointer'
              >
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center'>
                    <CldImage
                      src={product.productColor.images?.[0]?.url}
                      crop='fill'
                      width={80}
                      height={80}
                      alt='Image'
                      className='aspect-square object-cover rounded-md'
                    />
                    <div className='ml-2'>
                      <h3 className='text-base font-semibold'>
                        {product.productColor.productMaster.name}
                      </h3>

                      <p className='text-sm text-gray-600'>
                        Talla:{' '}
                        <span className='font-medium'>
                          {product.sizeCategory.size.value}
                        </span>
                      </p>

                      <p className='text-sm text-gray-600'>
                        Stock:{' '}
                        <span className='font-medium'>{product.stock}</span>
                      </p>

                      <p className='text-sm text-gray-600'>
                        Estado:{' '}
                        <span className='capitalize font-medium'>
                          {product.state.replace('_', ' ').toLowerCase()}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center'>
                    <p className='text-sm font-semibold'>
                      {formatMoney(product.price)}
                    </p>
                    <ShoppingCart className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
