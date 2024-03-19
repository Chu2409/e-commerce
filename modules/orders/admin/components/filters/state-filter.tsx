'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ORDER_STATE } from '@prisma/client'

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

import { useOrdersFilters } from '../../../shared/store/filters'

const states = Object.values(ORDER_STATE)

export const StateFilter = () => {
  const [open, setOpen] = useState(false)
  const value = useOrdersFilters((state) => state.filters.state)
  const setValue = useOrdersFilters((state) => state.setFilter)

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
            ? states.find((state) => state === value.toUpperCase())
            : 'Selecciona un estado...'}
          <CaretSortIcon className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[290px] p-0'>
        <Command>
          <CommandInput placeholder='Selecciona un estado...' className='h-9' />

          <CommandEmpty>Estado no encontrado</CommandEmpty>

          <CommandGroup className='overflow-y-auto max-h-[300px]'>
            {states.map((state) => (
              <CommandItem
                key={state}
                className='cursor-pointer'
                value={state}
                onSelect={(currentValue) => {
                  if (currentValue.toUpperCase() === value) {
                    setValue({ key: 'state', value: undefined })
                  } else {
                    setValue({
                      key: 'state',
                      value: currentValue.toUpperCase() as ORDER_STATE,
                    })
                  }
                  setOpen(false)
                }}
              >
                {state}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value?.toUpperCase() === state
                      ? 'opacity-100'
                      : 'opacity-0',
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
