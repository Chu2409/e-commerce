import { create } from 'zustand'
import { ISizesFilters } from '../interfaces/sizes-filters'

interface FiltersState {
  filters: ISizesFilters

  setFilter: ({
    key,
    value,
  }: {
    key: keyof ISizesFilters
    value: ISizesFilters[keyof ISizesFilters]
  }) => void

  clearFilters: () => void
}

const initialFilters: ISizesFilters = {
  categoryId: undefined,
  search: undefined,
  take: 11,
  skip: 0,
}

export const useSizesFilters = create<FiltersState>((set) => {
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
