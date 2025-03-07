import { create } from 'zustand'
import { IFullItemOrder } from '../interfaces/order'

interface ProductItemsInterface
  extends Pick<
    IFullItemOrder,
    'product' | 'quantity' | 'state' | 'delivered'
  > {}

interface ProductItemsState {
  productItems: ProductItemsInterface[]

  setProductItems: (productItems: ProductItemsInterface[]) => void

  modifyQuantity: (id: string, quantity: number) => void

  setDelivered: (id: string, delivered: boolean) => void

  addProductItem: (item: ProductItemsInterface) => void

  removeProductItem: (id: string) => void
}

const initialItems: IFullItemOrder[] = []

export const useItems = create<ProductItemsState>((set) => {
  return {
    productItems: initialItems,

    setProductItems: (items) => {
      set(() => ({
        productItems: items,
      }))
    },

    setDelivered: (id, delivered) => {
      set((state) => ({
        productItems: state.productItems.map((item) =>
          item.product.id === id ? { ...item, delivered } : item,
        ),
      }))
    },

    modifyQuantity: (id, quantity) => {
      set((state) => ({
        productItems: state.productItems.map((item) =>
          item.product.id === id ? { ...item, quantity } : item,
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
