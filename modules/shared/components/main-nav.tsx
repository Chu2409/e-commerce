'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { cn } from '@/lib/utils'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IRoute } from '@/modules/shared/interfaces/route'
import { LogOut, ShoppingBag } from 'lucide-react'
import { useCart } from '@/modules/cart/store/cart'

interface MainNavProps {
  routes: IRoute[]
  session: boolean
}

export const MainNav: React.FC<MainNavProps> = ({ routes, session }) => {
  const pathname = usePathname()
  const router = useRouter()

  const items = useCart((state) => state.productItems)

  return (
    <nav
      className={cn(
        'h-full text-center min-h-[3.5rem] px-6 w-full justify-between max-lg:flex-col gap-y-6 flex items-center gap-x-10',
        !session && 'justify-start',
      )}
    >
      {session && (
        <Link
          href='/'
          className={cn(
            'text-base font-extrabold transition-colors hover:text-primary',
            pathname === '/'
              ? 'text-black font-bold dark:text-white '
              : 'text-muted-foreground',
          )}
        >
          D&L American Outlet
        </Link>
      )}

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

      {session && (
        <div className='flex items-center space-x-4 ml-auto'>
          <Button
            variant='destructive'
            onClick={() => signOut()}
            className='flex gap-x-2 text-xs'
          >
            Cerrar sesión
            <LogOut className='w-4 h-4' />
          </Button>
        </div>
      )}

      {!session && (
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
      )}
    </nav>
  )
}
