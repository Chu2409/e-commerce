import { formatMoney } from '@/lib/utils'
import { ShoppingCart, X } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { ProductsCartInterface, useCart } from '../store/cart'
import { Input } from '@/components/ui/input'
import IconButton from '@/modules/admin/components/icon-button'

interface ProductInCartProps {
  item: ProductsCartInterface
}

export const ProductInCart: React.FC<ProductInCartProps> = ({ item }) => {
  const removeItem = useCart((state) => state.removeProductItem)
  const modifyQuantity = useCart((state) => state.modifyQuantity)

  return (
    <div className='flex items-center justify-between w-full border p-4 relative rounded-lg'>
      <div className='absolute right-0 top-0 p-2'>
        <IconButton
          icon={<X size={16} />}
          className='bg-red-500 text-white opacity-90'
          onClick={() => removeItem(item.product.id)}
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

      <div className='flex items-center gap-4'>
        <Input
          type='number'
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
