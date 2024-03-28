'use client'

import { Plus, X } from 'lucide-react'
import { Brand, Color, Size } from '@prisma/client'
import { Button } from '@/components/ui/button'
import BrandFilter from './brand-filter'
import SizeFilter from './size-filter'
import StateFilter from './state-filter'
import IconButton from '@/modules/admin/components/icon-button'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import ColorFilter from './color-filter'

interface MovileFiltersProps {
  sizes: Size[]
  colors: Color[]
  brands: Brand[]
}

const MobileFilters: React.FC<MovileFiltersProps> = ({
  sizes,
  colors,
  brands,
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
    <div className='lg:hidden'>
      <Button className='flex items-center gap-x-2' onClick={onOpen}>
        Filtros
        <Plus size={20} />
      </Button>

      <div
        className={cn(
          'absolute inset-0 bg-black bg-opacity-50 z-40',
          isOpen ? 'block' : 'hidden',
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'absolute bg-white right-0 z-50 top-0 bottom-0 max-w-xs w-full flex-col overflow-y-auto p-4',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <div className='flex items-center justify-end px-2'>
          <IconButton icon={<X size={15} />} onClick={onClose} />
        </div>

        <BrandFilter valueKey='brandId' name='Marcas' data={brands} />

        <SizeFilter valueKey='sizeId' name='Tallas/Tamaños' data={sizes} />

        <StateFilter valueKey='state' name='Estado' />

        <ColorFilter valueKey='colorId' name='Colores' data={colors} />
      </div>
    </div>
  )
}

export default MobileFilters
