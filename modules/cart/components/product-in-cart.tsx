'use client'

import { formatMoney } from '@/lib/utils'
import { ShoppingCart, X } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { IProductCart, useCart } from '../store/cart'
import { Input } from '@/components/ui/input'
import IconButton from '@/modules/admin/components/icon-button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Session } from 'next-auth'
import { deleteItemCart } from '../actions/delete-item-cart'

interface ProductInCartProps {
  item: IProductCart
  session: Session | null
}

export const ProductInCart: React.FC<ProductInCartProps> = ({
  item,
  session,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const removeItem = useCart((state) => state.removeProductItem)
  const modifyQuantity = useCart((state) => state.modifyQuantity)

  const handleClick = async () => {
    try {
      setIsLoading(true)

      if (session) {
        const itemDeleted = await deleteItemCart({
          customerId: session.user.id,
          productId: item.product.id,
        })

        if (!itemDeleted) throw new Error()
      }

      removeItem(item.product.id)
    } catch (error) {
      toast.error('Error al eliminar producto')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-between w-full border p-4 relative rounded-lg gap-1'>
      <div className='absolute right-0 top-0 p-2'>
        <IconButton
          disabled={isLoading}
          icon={<X size={16} />}
          className='bg-red-500 text-white opacity-90'
          onClick={handleClick}
        />
      </div>

      <div className='flex items-center'>
        <CldImage
          src={item.product.productColor.images?.[0]?.url}
          crop='fill'
          width={120}
          height={120}
          alt='Image'
          className='aspect-square object-cover rounded-md transition duration-300 ease-in-out group-hover:opacity-50'
        />

        <div className='ml-4'>
          <h3 className='text-base font-semibold'>
            {item.product.productColor.productMaster.name}
          </h3>

          {item.product.sizeCategory && (
            <p className='text-sm text-gray-600'>
              Talla:{' '}
              <span className='font-medium'>
                {item.product.sizeCategory.size.value}
              </span>
            </p>
          )}

          <p className='text-sm text-gray-600 flex items-center gap-2'>
            Stock: <span className='font-medium'>{item.product.stock}</span>
          </p>

          <p className='text-sm text-gray-600'>
            Estado:{' '}
            <span className='capitalize font-medium'>
              {item.state.replace('_', ' ').toLowerCase()}
            </span>
          </p>

          {item.product.productColor.productMaster.gender && (
            <p className='text-sm text-gray-600'>
              Género:{' '}
              <span className='font-medium capitalize'>
                {item.product.productColor.productMaster.gender
                  .replace('_', ' ')
                  .toLowerCase()}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className='flex items-center gap-x-4 gap-y-2 max-md:flex-col'>
        <Input
          type='number'
          inputMode='numeric'
          value={item.quantity}
          min={1}
          max={item.product.stock === 0 ? 10 : item.product.stock}
          onChange={(e) => {
            if (+e.target.value > item.product.stock) {
              return
            }
            modifyQuantity(item.product.id, +e.target.value)
          }}
          className='w-[60px] h-[25px] rounded-md'
        />

        <p className='text-base font-medium'>
          {formatMoney(item.product.price * item.quantity)}
        </p>
        <ShoppingCart className='ml-2 h-4 w-4 shrink-0 opacity-50' />
      </div>
    </div>
  )
}
