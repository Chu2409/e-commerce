'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpDown, Bolt, LogIn, Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import IconButton from '@/modules/admin/components/icon-button'
import { ICategoryRoutes } from '../interfaces/categories-routes'
import { Cart } from './cart'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Session } from 'next-auth'
import { Profile } from './profile'

export const CustomerMobileNavbar = ({
  routes,
  session,
}: {
  routes: ICategoryRoutes[]
  session: Session | null
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className='lg:hidden h-full'>
      <div className='w-full h-full flex justify-end items-center'>
        <Button onClick={onOpen} variant='ghost'>
          <Menu />
        </Button>
      </div>

      <div
        className={cn(
          'absolute inset-0 bg-black bg-opacity-50 z-30',
          isOpen ? 'block' : 'hidden',
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'absolute bg-white right-0 z-40 top-0 bottom-0 max-w-sm w-full flex-col p-4',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <div className='flex items-center justify-end px-2'>
          <IconButton icon={<X size={15} />} onClick={onClose} />
        </div>

        <div className='ml-auto flex items-center w-full py-2'>
          {session ? (
            session.user?.role === 'admin' ? (
              <Button
                variant='outline'
                onClick={() => router.push('/admin')}
                className='flex gap-x-2 text-xs ml-auto'
              >
                Administrar
                <Bolt className='w-4 h-4' />
              </Button>
            ) : (
              <Profile />
            )
          ) : (
            <Button
              variant='outline'
              onClick={() => router.push('/auth/login')}
              className='flex gap-x-2 text-xs ml-auto'
            >
              Iniciar sesión
              <LogIn className='w-4 h-4' />
            </Button>
          )}
        </div>

        <h2 className='text-base font-semibold py-2'>Secciones disponibles</h2>

        <div className='w-full flex flex-col py-2'>
          {routes.map((route) => (
            <Collapsible key={route.mainLabel} className='text-center w-full'>
              <CollapsibleTrigger
                className={cn(
                  'gap-2 rounded-md border py-2 shadow-sm w-full text-base',
                  route.routes.some((subRoute) => subRoute.href === pathname)
                    ? 'text-black font-bold dark:text-white   '
                    : 'text-muted-foreground',
                )}
              >
                <div className='flex items-center justify-center gap-2 '>
                  {route.mainLabel}
                  <ArrowUpDown size={12} />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className='flex flex-col gap-2 py-2'>
                {route.routes.map((subRoute) => (
                  <Link
                    key={subRoute.href}
                    href={subRoute.href}
                    className={cn(
                      'font-medium transition-colors flex justify-center items-center gap-2 text-sm rounded-md border py-2 shadow-sm bg-neutral-200',
                      subRoute.href === pathname
                        ? 'bg-primary text-white font-bold dark:text-white hover:opacity-90'
                        : 'text-muted-foreground hover:text-primary',
                    )}
                    onClick={onClose}
                  >
                    <ArrowRight size={12} />
                    {subRoute.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className='flex justify-end'>
          <Cart />
        </div>
      </div>
    </div>
  )
}
