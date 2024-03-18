'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { cn } from '@/lib/utils'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IRoute } from '@/modules/shared/interfaces/route'
import { LogOut } from 'lucide-react'

interface MainNavProps {
  routes: IRoute[]
  session: boolean
}

export const MainNav: React.FC<MainNavProps> = ({ routes, session }) => {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'h-14 px-6 w-full justify-between max-lg:flex-col max-lg:gap-y-8 flex items-center gap-x-14',
        !session && 'justify-start',
      )}
    >
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
    </nav>
  )
}
