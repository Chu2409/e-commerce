'use client'

// import toast from 'react-hot-toast'
import { useCart } from '../store/cart'
import { Button } from '@/components/ui/button'
import { formatMoney } from '@/lib/utils'

const Summary = () => {
  const items = useCart((state) => state.productItems)

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity
  }, 0)

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-gray-900'>Resúmen de Orden</h2>

      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>Total</div>

          <p className='text-base font-medium'>{formatMoney(totalPrice)}</p>
        </div>
      </div>

      <Button disabled={items.length === 0} className='w-full mt-6'>
        Comprar
      </Button>
    </div>
  )
}

export default Summary
