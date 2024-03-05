'use client'

import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import { IFullProductColor } from '../interfaces/product'

interface ProductCardProps {
  productColor: IFullProductColor
}

const ProductCard: React.FC<ProductCardProps> = ({ productColor }) => {
  const router = useRouter()

  const products = productColor.products

  return (
    <div className='bg-[#f6f6f6] w-[300px] rounded-xl border p-3 space-y-4'>
      <CldImage
        src={productColor.images?.[0]?.url}
        crop='fill'
        width={300}
        height={300}
        alt='Image'
        className='aspect-square object-cover rounded-md'
      />

      <div className='flex gap-2 items-center'>
        <div className='text-base font-medium'>Tallas disponibles:</div>
        {products.map((product) => (
          <div
            key={product.sizeCategory.id}
            className='text-base text-gray-600 cursor-pointer hover:scale-125 duration-300 hover:opacity-70'
            onClick={() => router.push(`/admin/products/${product.id}`)}
          >
            {product.sizeCategory.size.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCard
