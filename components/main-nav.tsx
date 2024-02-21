'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IRoute } from '@/shared/interfaces/route'

interface MainNavProps {
  routes: IRoute[]
}

export const MainNav: React.FC<MainNavProps> = ({ routes }) => {
  const pathname = usePathname()

  return (
    <nav className='max-lg:flex-col max-lg:gap-y-8 flex items-center gap-x-14 ml-4'>
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
    </nav>
  )
}
