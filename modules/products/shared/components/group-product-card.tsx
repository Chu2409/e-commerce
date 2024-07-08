'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn, formatMoney } from '@/lib/utils'
import { CldImage } from 'next-cloudinary'

import {
  IFullProduct,
  IFullProductColor,
  IFullProductMaster,
} from '../interfaces/product'

interface GroupProductCardProps {
  productMaster: IFullProductMaster
  link: string
}

export const GroupProductCard: React.FC<GroupProductCardProps> = ({
  productMaster,
  link,
}) => {
  const [mainProductColor, setMainProductColor] = useState<IFullProductColor>(
    productMaster.productsColors[0],
  )

  const [mainProduct, setMainProduct] = useState<IFullProduct>(
    productMaster.productsColors[0].products[0],
  )

  const colors = productMaster.productsColors.map(
    (productColor) => productColor?.color,
  )

  const sizes = mainProductColor.products.map(
    (product) => product.sizeCategory?.size,
  )

  const router = useRouter()
  const handleClick = () => {
    router.push(`${link}${mainProduct.id}`)
  }

  const handleColorChange = (colorId: string) => {
    const newProductColor = productMaster.productsColors.find(
      (productColor) => productColor.colorId === colorId,
    )
    if (newProductColor) {
      setMainProductColor(newProductColor)
      setMainProduct(newProductColor.products[0])
    }
  }

  const handleSizeChange = (sizeId: string) => {
    const newProduct = mainProductColor.products.find(
      (product) => product.sizeCategory?.sizeId === sizeId,
    )
    if (newProduct) {
      setMainProduct(newProduct)
    }
  }

  return (
    <div className='bg-[#f6f6f6] w-[290px] rounded-xl border p-3 space-y-4'>
      <CldImage
        src={mainProductColor.images?.[0]?.url}
        crop='fill'
        width={290}
        height={290}
        alt='Image'
        className='aspect-square object-cover rounded-md cursor-pointer hover:scale-110 transition duration-300 hover:drop-shadow-md'
        onClick={handleClick}
      />

      <div>
        <p className='font-semibold text-lg'>{productMaster.name}</p>

        {sizes[0] != null && (
          <div className='flex gap-2 items-center'>
            <div className='text-sm text-gray-500'>Tallas disponibles:</div>
            {sizes.map((size) => (
              <div
                key={size?.id}
                className={cn(
                  'text-sm text-gray-600 cursor-pointer hover:scale-125 duration-300 hover:opacity-70',
                  {
                    'font-extrabold':
                      size?.id === mainProduct.sizeCategory?.sizeId,
                  },
                )}
                onClick={() => handleSizeChange(size!.id)}
              >
                {size!.value}
              </div>
            ))}
          </div>
        )}

        <div className='flex gap-2 items-center text-sm text-gray-500'>
          Stock:
          <span className='font-semibold'>{mainProduct.stock}</span>
        </div>

        <p className='text-sm text-gray-600'>
          Estado:{' '}
          <span className='capitalize font-medium'>
            {mainProduct.state.replace('_', ' ').toLowerCase()}
          </span>
        </p>

        {productMaster.gender && (
          <p className='text-sm text-gray-600'>
            Género:{' '}
            <span className='capitalize font-medium'>
              {productMaster.gender?.replace('_', ' ').toLowerCase()}
            </span>
          </p>
        )}
      </div>

      <div className='flex items-center justify-between font-semibold'>
        {formatMoney(mainProduct.price)}

        {colors[0] != null && (
          <div className='flex gap-1'>
            {colors.map((color) => (
              <div
                key={color?.id}
                className={cn(
                  'w-4 h-4 rounded-full border cursor-pointer hover:scale-125 duration-300 hover:opacity-70 border-black border-opacity-30 ',

                  color?.id === mainProductColor.colorId
                    ? 'border-opacity-50'
                    : 'opacity-40 scale-75',
                )}
                onClick={() => handleColorChange(color?.id || '')}
                style={{ backgroundColor: color?.value }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
