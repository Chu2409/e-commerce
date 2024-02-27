'use client'

import { Input } from '@/components/ui/input'
import debounce from 'just-debounce-it'

import { useCallback, useEffect, useState } from 'react'
import { useProductsFilters } from '../../store/filters'

export const NameFilter = () => {
  const [value, setValue] = useState<string>('')

  const setFilter = useProductsFilters((state) => state.setFilter)
  const name = useProductsFilters((state) => state.filters.name)

  useEffect(() => {
    setValue(name || '')
  }, [name])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      setFilter({ key: 'name', value: search === '' ? undefined : search })
    }, 300),
    [],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setValue(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <Input
      placeholder='Filtrar...'
      className='w-[300px]'
      onChange={handleChange}
      value={value}
    />
  )
}
