'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ICategoryRoutes } from '../interfaces/categories-routes'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Cart } from './cart'

export const CustomerMainNav = ({ routes }: { routes: ICategoryRoutes[] }) => {
  const pathname = usePathname()

  return (
    <nav className='w-full px-6 flex gap-4 items-center max-lg:hidden'>
      {routes.map((route) => (
        <NavigationMenu key={route.mainLabel}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  'text-base text-muted-foreground font-medium transition-colors hover:text-primary text-center',
                  route.routes.some((subRoute) => subRoute.href === pathname) &&
                    'text-black font-bold',
                )}
              >
                {route.mainLabel}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className='grid w-max gap-y-4 gap-x-10 p-4 lg:grid-cols-2'>
                  {route.routes.map((subRoute) => (
                    <Link
                      href={subRoute.href}
                      legacyBehavior
                      passHref
                      key={subRoute.href}
                    >
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle,
                          'flex items-center gap-2 text-sm',
                          subRoute.href === pathname
                            ? 'text-black font-bold dark:text-white'
                            : 'text-muted-foreground',
                        )}
                      >
                        <ArrowRight size={12} />
                        {subRoute.label}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ))}

      <div className='ml-auto'>
        <Cart />
      </div>
    </nav>
  )
}
