'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Category } from '@prisma/client'

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

import { useSizesFilters } from '../../../shared/store/filters'

export const CategoriesFilter = ({
  categories,
}: {
  categories: Category[]
}) => {
  const [open, setOpen] = useState(false)
  const value = useSizesFilters((state) => state.filters.categoryId)
  const setValue = useSizesFilters((state) => state.setFilter)

  const [selected, setSelected] = useState<Category | undefined>()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectedCategory = categories.find(
      (category) => category.id === value,
    )
    setSelected(selectedCategory)
  }, [value, categories])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[290px] justify-between font-light'
        >
          {selected ? `${selected.name}` : 'Selecciona una categoría...'}
          <CaretSortIcon className='h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[290px] p-0'>
        <Command>
          <CommandInput
            placeholder='Selecciona una categoría...'
            className='h-9'
          />

          <CommandEmpty>Categoría no encontrado</CommandEmpty>

          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                className='cursor-pointer'
                key={category.id}
                value={category.name}
                onSelect={() => {
                  if (category.id === value) {
                    setValue({ key: 'categoryId', value: undefined })
                  } else {
                    setValue({ key: 'categoryId', value: category.id })
                  }
                }}
              >
                {category.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === category.id ? 'opacity-100' : 'opacity-0',
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
