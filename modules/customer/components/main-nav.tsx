'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IRoute } from '@/modules/shared/interfaces/route'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/modules/cart/store/cart'

interface MainNavProps {
  routes: IRoute[]
}

export const CustomerMainNav: React.FC<MainNavProps> = ({ routes }) => {
  const pathname = usePathname()
  const router = useRouter()

  const items = useCart((state) => state.productItems)

  return (
    <nav className='flex px-6 w-full justify-between max-lg:flex-col gap-y-6 items-center gap-x-10'>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-base font-medium transition-colors hover:text-primary',
            route.href === pathname
              ? 'text-black font-bold dark:text-white '
              : 'text-muted-foreground',
          )}
        >
          {route.label}
        </Link>
      ))}

      <div className='ml-auto flex items-center gap-x-4'>
        <Button
          onClick={() => router.push('/cart')}
          className='flex items-center rounded-full bg-black px-4 py-2'
        >
          <ShoppingBag size={20} color='white' />
          <span className='ml-2 text-sm font-medium text-white'>
            {items.length}
          </span>
        </Button>
      </div>
    </nav>
  )
}
