'use client'

import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import { formatMoney } from '@/lib/utils'
import { IFullProduct } from '../interfaces/product'

interface ProductCardProps {
  product: IFullProduct
  id: string
  name: string
  category: string
  brand: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  id,
  name,
  brand,
  category,
}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/admin/products/${product.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className='bg-[#f6f6f6] w-[300px] group cursor-pointer rounded-xl border p-3 space-y-4 hover:drop-shadow-lg transition-shadow duration-300'
    >
      <CldImage
        src={product.images?.[0]?.url}
        crop='fill'
        width={300}
        height={300}
        alt='Image'
        className='aspect-square object-cover rounded-md overflow-hidden group-hover:scale-110 group-hover:rounded-xl transition-transform duration-300'
      />

      <div>
        <p className='font-semibold text-lg'>{name}</p>

        <div className='flex gap-2 items-center'>
          <div className='text-sm text-gray-500'>Tallas disponibles:</div>
          <div className='text-sm text-gray-600'>{product.size.size.name}</div>
        </div>
      </div>

      <div className='flex items-center justify-between font-semibold '>
        {formatMoney(product.price)}

        <div className='flex gap-1'>
          <div
            className='w-4 h-4 rounded-full border'
            style={{ backgroundColor: product.color.value }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
