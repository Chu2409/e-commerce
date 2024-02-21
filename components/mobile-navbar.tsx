'use client'

import { Button } from '@/components/ui/button'
import { LayoutPanelTop, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'

export const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1023) {
        // Change 768 to your desired breakpoint
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onClick = () => setIsOpen(!isOpen)

  return (
    <>
      <Button
        onClick={onClick}
        className='lg:hidden flex h-full ml-auto mr-2'
        variant='ghost'
      >
        <Menu />
      </Button>

      <Dialog open={isOpen} onOpenChange={onClick}>
        <DialogContent className=' h-full w-full max-w-md ml-auto mr-2 fixed transform-none top-0 right-0 flex flex-col'>
          <DialogHeader>
            <DialogTitle className='flex items-center justify-start  text-gray-900 '>
              <span className='mr-2'>Secciones Disponibles</span>
              <LayoutPanelTop />
            </DialogTitle>
          </DialogHeader>

          <div onClick={() => setIsOpen(false)}>{children}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
