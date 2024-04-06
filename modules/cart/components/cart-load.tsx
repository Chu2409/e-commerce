'use client'

import { IProductCart, useCart } from '@/modules/cart/store/cart'
import { useEffect } from 'react'
import { addProductToCart } from '../actions/add-product-to-cart'
import { useSession } from 'next-auth/react'

export const CartLoad = ({
  productsInCart,
}: {
  productsInCart: IProductCart[]
}) => {
  const { data: session } = useSession()
  const items = useCart((state) => state.productItems)

  const setProductItems = useCart((state) => state.setProductItems)

  useEffect(() => {
    const newItems = items.filter((item) => !productsInCart.includes(item))

    if (session && newItems.length > 0) {
      const addToCart = async () => {
        for (const item of newItems) {
          await addProductToCart({
            customerId: session.user.id,
            productId: item.product.id,
            quantity: item.quantity,
            productPrice: item.product.price,
          })
        }
      }
      addToCart()
    }

    setProductItems([...newItems, ...productsInCart])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
