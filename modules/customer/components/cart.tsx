import { useCart } from '@/modules/cart/store/cart'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface CartProps {
  onClick?: () => void
}

export const Cart: React.FC<CartProps> = ({ onClick }) => {
  const items = useCart((state) => state.productItems)

  return (
    <Link
      href='/cart'
      className='justify-center text-sm font-medium transition-colors text-primary-foreground h-12 flex items-center rounded-full bg-black px-6 py-2 hover:opacity-70 gap-2'
      onClick={onClick}
    >
      <ShoppingBag size={20} />
      <span className='text-sm font-medium text-white'>{items.length}</span>
    </Link>
  )
}
