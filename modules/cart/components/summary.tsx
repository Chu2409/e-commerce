'use client'

import { useCart } from '../store/cart'
import { formatMoney } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER!

const Summary = () => {
  const { data: session } = useSession()

  const items = useCart((state) => state.productItems)

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity
  }, 0)

  const handleClick = () => {
    let url

    if (session) {
      url = `https://api.whatsapp.com/send/?phone=${phone}&text=Hola, soy ${session.user.name} y he registrado mi carrito de compras en la tienda. ¿Podrías ayudarme con mi pedido?`
    } else {
      url = `https://api.whatsapp.com/send/?phone=${phone}&text=Hola, me puedes ayudar con los siguientes productos: ${items.map((item) => `${item.product.productColor.productMaster.name} - ${item.product.sizeCategory?.size.value || ''} - ${item.product.productColor.color?.name || ''} x ${item.quantity}`).join(', ')}`
    }

    window.open(url)
  }

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-gray-900'>Resúmen de Orden</h2>

      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>Total</div>

          <p className='text-base font-medium'>{formatMoney(totalPrice)}</p>
        </div>
      </div>

      <Button
        className='w-full mt-6 py-6 relative'
        disabled={items.length === 0}
        onClick={handleClick}
      >
        Realizar pedido
      </Button>
    </div>
  )
}

export default Summary
