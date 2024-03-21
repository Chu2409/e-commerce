'use client'
import { useCart } from '../store/cart'
import { ProductInCart } from './product-in-cart'
import Summary from './summary'

export const CartClient = () => {
  const items = useCart((state) => state.productItems)

  return (
    <div className='flex justify-center w-full px-8 py-10'>
      <div className='flex flex-col gap-8 max-w-7xl w-full'>
        <h1 className='text-3xl font-bold text-black'>Carrito de compra</h1>

        <div className='lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
          <div className='lg:col-span-7 flex flex-col gap-4'>
            {items.length === 0 && (
              <p className='text-neutral-500'>No hay productos en el carrito</p>
            )}

            {items.map((item) => (
              <ProductInCart key={item.product.id} item={item} />
            ))}
          </div>

          <Summary />
        </div>
      </div>
    </div>
  )
}
