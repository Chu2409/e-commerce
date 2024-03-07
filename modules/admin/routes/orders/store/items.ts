import { create } from 'zustand'
import { IFullItem } from '../interfaces/order'

interface ProductItemsInterface
  extends Pick<IFullItem, 'product' | 'quantity'> {}

interface ProductItemsState {
  productItems: ProductItemsInterface[]

  setProductItems: (productItems: ProductItemsInterface[]) => void

  addProductItem: (item: ProductItemsInterface) => void

  removeProductItem: (id: string) => void
}

const initialItems: IFullItem[] = []

export const useItems = create<ProductItemsState>((set) => {
  return {
    productItems: initialItems,

    setProductItems: (items) => {
      set(() => ({
        productItems: items,
      }))
    },

    addProductItem: (item) => {
      set((state) => ({
        productItems: [...state.productItems, { ...item }],
      }))
    },

    removeProductItem: (id) => {
      set((state) => ({
        productItems: state.productItems.filter(
          (item) => item.product.id !== id,
        ),
      }))
    },
  }
})
