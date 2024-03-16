'use client'

import { useState } from 'react'
import { Customer } from '@prisma/client'
import { cn } from '@/lib/utils'

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

export const CustomerFilter = ({ customers }: { customers: Customer[] }) => {
  const [open, setOpen] = useState(false)
  const value = useOrdersFilters((state) => state.filters.customerId)
  const setValue = useOrdersFilters((state) => state.setFilter)

  const customerSelected = customers.find((customer) => customer.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[300px] justify-between font-light'
        >
          {customerSelected
            ? customerSelected.firstName + ' ' + customerSelected.lastName
            : 'Selecciona un cliente...'}
          <CaretSortIcon className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput
            placeholder='Selecciona un cliente...'
            className='h-9'
          />

          <CommandEmpty>Cliente no encontrado</CommandEmpty>

          <CommandGroup>
            {customers.map((customer) => (
              <CommandItem
                className='cursor-pointer'
                key={customer.id}
                value={customer.firstName + customer.lastName}
                onSelect={() => {
                  if (customer.id === value) {
                    setValue({ key: 'customerId', value: undefined })
                  } else {
                    setValue({ key: 'customerId', value: customer.id })
                  }
                }}
              >
                {customer.firstName} {customer.lastName}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === customer.id ? 'opacity-100' : 'opacity-0',
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
