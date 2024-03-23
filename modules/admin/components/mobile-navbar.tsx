'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import IconButton from '@/modules/admin/components/icon-button'

export const AdminMobileNavbar = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
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
          'absolute inset-0 bg-black bg-opacity-50 z-40',
          isOpen ? 'block' : 'hidden',
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'absolute bg-white right-0 z-50 top-0 bottom-0 max-w-sm w-full flex-col p-4',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <div className='flex items-center justify-end px-2'>
          <IconButton icon={<X size={15} />} onClick={onClose} />
        </div>

        <h2 className='text-base pb-5 font-semibold'>Secciones disponibles</h2>
        <div onClick={() => setIsOpen(false)}>{children}</div>
      </div>
    </div>
  )
}
