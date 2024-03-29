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
import { Profile } from './profile'

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
                <ul className='grid grid-cols-2 gap-4 p-4 w-max'>
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
                          'flex items-center gap-2 text-sm min-w-[200px]',
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

      <div className='ml-auto flex items-center'>
        <Profile />
      </div>

      <div className='fixed bottom-0 right-0 p-4'>
        <Cart />
      </div>
    </nav>
  )
}
