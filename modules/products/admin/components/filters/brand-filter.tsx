'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Brand } from '@prisma/client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'

import { useProductsFilters } from '../../../shared/store/filters'

export const BrandFilter = ({ brands }: { brands: Brand[] }) => {
  const [open, setOpen] = useState(false)
  const value = useProductsFilters((state) => state.filters.brandId)
  const setValue = useProductsFilters((state) => state.setFilter)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[290px] justify-between font-light'
        >
          {value
            ? brands.find((brand) => brand.id === value)?.name
            : 'Selecciona una marca...'}
          <CaretSortIcon className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[290px] p-0'>
        <Command>
          <CommandInput placeholder='Selecciona una marca...' className='h-9' />

          <CommandEmpty>Marca no encontrado</CommandEmpty>

          <CommandGroup>
            {brands.map((brand) => (
              <CommandItem
                className='cursor-pointer'
                key={brand.id}
                value={brand.id}
                onSelect={() => {
                  if (brand.id === value) {
                    setValue({ key: 'brandId', value: undefined })
                  } else {
                    setValue({ key: 'brandId', value: brand.id })
                  }
                }}
              >
                {brand.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === brand.id ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
