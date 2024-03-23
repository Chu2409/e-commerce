'use client'

import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'

import { IFullProductColor } from '../../shared/interfaces/product'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  productColor: IFullProductColor
}

const ProductCard: React.FC<ProductCardProps> = ({ productColor }) => {
  const products = productColor.products
  const [productId, setProductId] = useState(products[0].id)

  const router = useRouter()

  return (
    <div className='bg-[#f6f6f6] w-[290px] rounded-xl border p-3 gap-4 flex flex-col'>
      <CldImage
        src={productColor.images?.[0]?.url}
        crop='fill'
        width={290}
        height={290}
        alt='Image'
        className='aspect-square object-cover rounded-md cursor-pointer hover:scale-110 transition duration-300 hover:drop-shadow-md'
        onClick={() => router.push(`/admin/products/${productId}`)}
      />

      {products.some((product) => product.sizeCategory) && (
        <div className='flex gap-2 items-center'>
          <div className='text-base font-medium'>Tallas disponibles:</div>
          {products.map((product) => (
            <div
              key={product.sizeCategory?.id}
              className={cn(
                'text-sm text-gray-600 cursor-pointer hover:scale-125 duration-300 hover:opacity-70',
                {
                  'font-extrabold': product.id === productId,
                },
              )}
              onClick={() => setProductId(product.id)}
            >
              {product.sizeCategory?.size.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCard
