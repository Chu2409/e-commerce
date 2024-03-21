'use client'

import { useState } from 'react'
import { IFullProductMaster } from '../../shared/interfaces/product'
import { cn, formatMoney } from '@/lib/utils'
import { CldImage } from 'next-cloudinary'
import { Image } from '@prisma/client'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/modules/cart/store/cart'

interface ProductInfoProps {
  productMaster: IFullProductMaster
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ productMaster }) => {
  const [mainProductColor, setMainProductColor] = useState(
    productMaster.productsColors[0],
  )
  const [mainProduct, setMainProduct] = useState(mainProductColor.products[0])
  const [mainProductImage, setMainProductImage] = useState<Image>(
    mainProductColor.images[0],
  )

  const sizes = mainProductColor.products.map(
    (product) => product.sizeCategory.size,
  )
  const colors = productMaster.productsColors.map(
    (productColor) => productColor.color,
  )

  const handleColorChange = (colorId: string) => {
    const newProductColor = productMaster.productsColors.find(
      (productColor) => productColor.colorId === colorId,
    )
    if (newProductColor) {
      setMainProductColor(newProductColor)
      setMainProduct(newProductColor.products[0])
      setMainProductImage(newProductColor.images[0])
    }
  }

  const handleSizeChange = (sizeId: string) => {
    const newProduct = mainProductColor.products.find(
      (product) => product.sizeCategory.sizeId === sizeId,
    )
    if (newProduct) {
      setMainProduct(newProduct)
    }
  }

  const addItemToCart = useCart((state) => state.addProductItem)

  return (
    <div className='grid lg:grid-cols-2 lg:gap-6 gap-10'>
      <div className='flex flex-col w-full items-center justify-center gap-6'>
        <div className='aspect-square relative max-w-2xl w-full'>
          <CldImage
            src={mainProductImage.url}
            fill
            sizes='100%'
            alt='Image'
            className='object-cover rounded-lg'
          />
        </div>

        <div className='max-w-2xl w-full'>
          <ToggleGroup type='single' className='grid grid-cols-4 gap-4'>
            {mainProductColor.images.map((image) => (
              <ToggleGroupItem
                key={image.id}
                value={image.id}
                onClick={() => setMainProductImage(image)}
                className='relative h-full w-full aspect-square rounded-md'
              >
                <CldImage
                  src={image.url}
                  fill
                  sizes='100%'
                  alt='Image'
                  className='object-cover rounded-lg'
                />

                <span
                  className={cn(
                    'absolute inset-0 rounded-md ring-2 ring-offset-2',
                    image.id === mainProductImage.id
                      ? 'ring-black'
                      : 'ring-transparent',
                  )}
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className='max-lg:place-self-center'>
        <h1 className='text-3xl font-bold text-gray-900'>
          {productMaster.name}
        </h1>

        <div className='mt-3 flex items-end justify-between'>
          <p className='text-2xl text-gray-900'>
            {formatMoney(mainProduct.price)}
          </p>
        </div>

        <hr className='my-4' />

        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-black'>Tallas disponibles:</div>

            {sizes.map((size) => (
              <div
                key={size.id}
                className={cn(
                  'text-sm text-gray-600 cursor-pointer hover:scale-125 duration-300 hover:opacity-70',
                  {
                    'font-bold': size.id === mainProduct.sizeCategory.sizeId,
                  },
                )}
                onClick={() => handleSizeChange(size.id)}
              >
                {size.value}
              </div>
            ))}
          </div>

          <div className='flex items-center gap-2'>
            <h3 className='font-semibold text-black'>Colores:</h3>
            <div className='flex gap-1'>
              {colors.map((color) => (
                <div
                  key={color.id}
                  className={cn(
                    'w-6 h-6 rounded-full border cursor-pointer hover:scale-125 duration-300 hover:opacity-70 border-black border-opacity-30',
                    color.id === mainProductColor.colorId
                      ? 'border-opacity-50'
                      : 'opacity-40 scale-75',
                  )}
                  onClick={() => handleColorChange(color.id)}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <h3 className='font-semibold text-black'>Stock:</h3>
            <div className='flex gap-1'>{mainProduct.stock}</div>
          </div>

          <div className='flex items-center gap-2'>
            <h3 className='font-semibold text-black'>Estado:</h3>
            <div className='flex gap-1 capitalize'>
              {mainProduct.state.replace('_', ' ').toLowerCase()}
            </div>
          </div>

          <div className='mt-6 flex items-center gap-x-3 self-end '>
            <Button
              onClick={() => {
                addItemToCart({
                  product: {
                    ...mainProduct,
                    productColor: {
                      ...mainProductColor,
                      productMaster,
                    },
                  },
                  quantity: 1,
                  state: mainProduct.state,
                })
              }}
              className='flex items-center gap-x-2'
            >
              Agregar al carrito
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
