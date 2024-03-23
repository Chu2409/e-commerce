import { IFullItemOrder } from '@/modules/orders/shared/interfaces/order'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

export interface ProductsCartInterface
  extends Pick<IFullItemOrder, 'product' | 'quantity' | 'state'> {}

interface ProductItemsState {
  productItems: ProductsCartInterface[]
  setProductItems: (productItems: ProductsCartInterface[]) => void
  addProductItem: (item: ProductsCartInterface) => void
  modifyQuantity: (id: string, quantity: number) => void
  removeProductItem: (id: string) => void
  clearCart: () => void
}

const initialItems: IFullItemOrder[] = []

export const useCart = create(
  persist<ProductItemsState>(
    (set, get) => ({
      productItems: initialItems,

      setProductItems: (items) => {
        set(() => ({
          productItems: items,
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
        const currentItems = get().productItems
        const existingItem = currentItems.find(
          (cartItem) => cartItem.product.id === item.product.id,
        )
        if (existingItem)
          return toast.error('Producto ya se encuentra en el carrito')

        set((state) => ({
          productItems: [...state.productItems, { ...item }],
        }))

        toast.success('Producto agregado al carrito')
      },

      removeProductItem: (id) => {
        set((state) => ({
          productItems: state.productItems.filter(
            (item) => item.product.id !== id,
          ),
        }))

        toast.success('Producto eliminado del carrito')
      },

      clearCart: () => {
        set(() => ({
          productItems: [],
        }))

        toast.success('Carrito limpiado')
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
