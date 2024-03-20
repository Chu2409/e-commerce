'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Color } from '@prisma/client'

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

export const ColorFilter = ({ colors }: { colors: Color[] }) => {
  const [open, setOpen] = useState(false)
  const value = useProductsFilters((state) => state.filters.colorId)
  const setValue = useProductsFilters((state) => state.setFilter)

  const color = colors.find((color) => color.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[290px] justify-between font-light'
        >
          {color ? (
            <div className='flex items-center gap-x-2'>
              {color.name}
              <div
                className='w-6 h-6 rounded-full border border-black border-opacity-30'
                style={{ backgroundColor: color.value }}
              />
            </div>
          ) : (
            'Selecciona un color...'
          )}
          <CaretSortIcon className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[290px] p-0 '>
        <Command
          filter={(value, search) => {
            const name = value.split('_')[1]

            if (name.toLowerCase().includes(search.toLowerCase())) return 1

            return 0
          }}
        >
          <CommandInput placeholder='Selecciona un color...' className='h-9' />

          <CommandEmpty>Color no encontrado</CommandEmpty>

          <CommandGroup className='overflow-y-auto max-h-[300px]'>
            {colors.map((color) => (
              <CommandItem
                className='cursor-pointer'
                key={color.id}
                value={color.id + '_' + color.name}
                onSelect={() => {
                  if (color.id === value) {
                    setValue({ key: 'colorId', value: undefined })
                  } else {
                    setValue({ key: 'colorId', value: color.id })
                  }
                  setValue({ key: 'skip', value: 0 })
                }}
              >
                <div className='flex items-center gap-x-2'>
                  {color.name}
                  <div
                    className='w-6 h-6 rounded-full border border-black border-opacity-30'
                    style={{ backgroundColor: color.value }}
                  />
                </div>
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === color.id ? 'opacity-100' : 'opacity-0',
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
