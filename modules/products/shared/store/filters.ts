import { create } from 'zustand'
import { IProductsFilters } from '../interfaces/products-filters'

interface FiltersState {
  filters: IProductsFilters

  setFilter: ({
    key,
    value,
  }: {
    key: keyof IProductsFilters
    value: IProductsFilters[keyof IProductsFilters]
  }) => void

  clearFilters: () => void
}

const initialFilters: IProductsFilters = {
  name: undefined,
  state: undefined,
  gender: undefined,
  brandId: undefined,
  categoryId: undefined,
  sizeId: undefined,
  colorId: undefined,
  take: 11,
  skip: 0,
}

export const useProductsFilters = create<FiltersState>((set) => {
  return {
    filters: initialFilters,

    setFilter: ({ key, value }) => {
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: value,
        },
      }))
    },

    clearFilters: () => {
      set(() => ({
        filters: initialFilters,
      }))
    },
  }
})
