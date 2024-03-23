'use client'

import toast from 'react-hot-toast'
import { useCart } from '../store/cart'
import { formatMoney } from '@/lib/utils'

const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER!

const Summary = () => {
  const items = useCart((state) => state.productItems)

  const message = items.reduce((acc, item) => {
    return (
      acc +
      `|${item.product.productColor.productMaster.name} ~ ${item.product.productColor.color?.name} ~ ${item.quantity}|`
    )
  }, '')

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

      <a
        className='w-full mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-70 cursor-pointer'
        href={`https://api.whatsapp.com/send/?phone=${phone}&text=Hola, me gustaría comprar los siguientes productos: ${message}`}
        target='_blank'
        onClick={() => {
          toast.success('¡Pedido realizado con éxito!')
        }}
      >
        Realizar pedido
      </a>
    </div>
  )
}

export default Summary
