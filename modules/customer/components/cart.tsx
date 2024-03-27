import { useCart } from '@/modules/cart/store/cart'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export const Cart = () => {
  const items = useCart((state) => state.productItems)

  return (
    <Link
      href='/cart'
      className='justify-center text-sm font-medium transition-colors text-primary-foreground h-10 flex items-center rounded-full bg-black px-4 py-2 hover:opacity-70'
    >
      <ShoppingBag size={20} />
      <span className='ml-2 text-sm font-medium text-white'>
        {items.length}
      </span>
    </Link>
  )
}
