'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IRoute } from '@/shared/interfaces/route'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface MainNavProps {
  routes: IRoute[]
}

export const MainNav: React.FC<MainNavProps> = ({ routes }) => {
  const pathname = usePathname()

  return (
    <nav className='h-14 px-6 w-full justify-between max-lg:flex-col max-lg:gap-y-8 flex items-center gap-x-14'>
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
    </nav>
  )
}
