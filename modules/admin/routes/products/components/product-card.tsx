'use client'

import { useRouter } from 'next/navigation'
// import usePreviewModal from '@/hooks/use-preview-modal'
import { IFullProduct } from '../interfaces/full-product'
import { CldImage } from 'next-cloudinary'
import { formatMoney } from '@/lib/utils'

interface ProductCardProps {
  data: IFullProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/admin/products/${data?.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className='bg-[#f6f6f6] w-[300px] group cursor-pointer rounded-xl border p-3 space-y-4 hover:drop-shadow-lg transition-shadow duration-300'
    >
      <CldImage
        src={data?.images?.[0]?.url}
        crop='fill'
        width={300}
        height={300}
        alt='Image'
        className='aspect-square object-cover rounded-md overflow-hidden group-hover:scale-110 group-hover:rounded-xl transition-transform duration-300'
      />

      <div>
        <p className='font-semibold text-lg'>{data.name}</p>

        <p className='text-sm text-gray-500'>{data.category?.name}</p>
      </div>

      <div className='flex items-center justify-between font-semibold'>
        {formatMoney(data?.price)}
      </div>
    </div>
  )
}

export default ProductCard
