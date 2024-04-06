'use client'

import { IProductCart, useCart } from '@/modules/cart/store/cart'
import { useEffect } from 'react'

export const CartLoad = ({
  productsInCart,
}: {
  productsInCart: IProductCart[]
}) => {
  const setProductItems = useCart((state) => state.setProductItems)

  useEffect(() => {
    setProductItems(productsInCart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
