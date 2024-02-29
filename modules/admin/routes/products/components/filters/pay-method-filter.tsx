'use client'

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
import { cn } from '@/lib/utils'
import { PAY_METHOD } from '@prisma/client'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import { useOrdersFilters } from '../../../orders/store/filters'

const payMethods = Object.values(PAY_METHOD)

export const PayMethodFilter = () => {
  const [open, setOpen] = useState(false)
  const value = useOrdersFilters((state) => state.filters.payMethod)
  const setValue = useOrdersFilters((state) => state.setFilter)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[300px] justify-between font-light'
        >
          {value
            ? payMethods.find((state) => state === value.toUpperCase())
            : 'Selecciona un método de pago...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput placeholder='Selecciona un estado...' className='h-9' />

          <CommandEmpty>Método de pago no encontrado</CommandEmpty>

          <CommandGroup>
            {payMethods.map((state) => (
              <CommandItem
                className='cursor-pointer'
                key={state}
                value={state}
                onSelect={(currentValue) => {
                  if (currentValue.toUpperCase() === value) {
                    setValue({ key: 'payMethod', value: undefined })
                  } else {
                    setValue({
                      key: 'payMethod',
                      value: currentValue.toUpperCase() as PAY_METHOD,
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
