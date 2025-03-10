'use client'

import { useEffect, useState } from 'react'
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

import { IFullSize } from '@/modules/sizes/shared/interfaces/size'
import { useProductsFilters } from '../../../shared/store/filters'
import { getSizesByCategory } from '@/modules/sizes/shared/actions/get-sizes-by-category'

export const SizeFilter = () => {
  const [open, setOpen] = useState(false)
  const value = useProductsFilters((state) => state.filters.sizeId)
  const setValue = useProductsFilters((state) => state.setFilter)

  const categoryId = useProductsFilters((state) => state.filters.categoryId)
  const [data, setData] = useState<Omit<IFullSize, 'category'>[]>([])

  useEffect(() => {
    setValue({ key: 'sizeId', value: undefined })
    const fetchSizes = async () => {
      if (categoryId) {
        const sizes = await getSizesByCategory(categoryId)
        setData(sizes)
      }
    }
    fetchSizes()

    return () => {
      setData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])

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
            ? data.find((sizeByCategory) => sizeByCategory.id === value)?.size
                .name
            : 'Selecciona una talla/tamaño...'}
          <CaretSortIcon className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[290px] p-0'>
        <Command>
          <CommandInput
            placeholder='Selecciona una talla/tamaño...'
            className='h-9'
          />

          <CommandEmpty>Talla/Tamaño no encontrada</CommandEmpty>

          <CommandGroup className='overflow-y-auto max-h-[300px]'>
            {data.map((sizeByCategory) => (
              <CommandItem
                className='cursor-pointer'
                key={sizeByCategory.id}
                value={sizeByCategory.id}
                onSelect={() => {
                  if (sizeByCategory.id === value) {
                    setValue({ key: 'sizeId', value: undefined })
                  } else {
                    setValue({ key: 'sizeId', value: sizeByCategory.id })
                  }
                  setValue({ key: 'skip', value: 0 })
                }}
              >
                {sizeByCategory.size.name} - {sizeByCategory.size.value}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === sizeByCategory.id ? 'opacity-100' : 'opacity-0',
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
