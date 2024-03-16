import { IOrdersFilters } from '../interfaces/order-filters'
import { create } from 'zustand'

interface FiltersState {
  filters: IOrdersFilters

  setFilter: ({
    key,
    value,
  }: {
    key: keyof IOrdersFilters
    value: IOrdersFilters[keyof IOrdersFilters]
  }) => void

  clearFilters: () => void
}

const initialFilters: IOrdersFilters = {
  dateFrom: undefined,
  dateTo: undefined,
  state: undefined,
  payMethod: undefined,
  customerId: undefined,
  take: 11,
  skip: 0,
}

export const useOrdersFilters = create<FiltersState>((set) => {
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
