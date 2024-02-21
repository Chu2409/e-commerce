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
}

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: {
    dateFrom: undefined,
    dateTo: undefined,
    state: undefined,
    payMethod: undefined,
    customerId: undefined,
  },
  setFilter: ({ key, value }) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }))
  },
}))
