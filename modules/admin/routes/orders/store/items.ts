import { create } from 'zustand'
import { IFullItem } from '../interfaces/order'

interface ProductItemsInterface
  extends Pick<IFullItem, 'product' | 'quantity' | 'state' | 'delivered'> {}

interface ProductItemsState {
  productItems: ProductItemsInterface[]

  setProductItems: (productItems: ProductItemsInterface[]) => void

  modifyQuantity: (id: string, quantity: number) => void

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

    modifyQuantity: (id, quantity) => {
      set((state) => ({
        productItems: state.productItems.map((item) =>
          item.product.id === id ? { ...item, quantity: +quantity } : item,
        ),
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
