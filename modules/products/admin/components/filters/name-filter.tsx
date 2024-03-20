'use client'

import { useCallback, useEffect, useState } from 'react'
import debounce from 'just-debounce-it'

import { Input } from '@/components/ui/input'

import { useProductsFilters } from '../../../shared/store/filters'

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
      setFilter({ key: 'skip', value: 0 })
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
      placeholder='Filtrar Nombre...'
      className='w-[290px]'
      onChange={handleChange}
      value={value}
    />
  )
}
