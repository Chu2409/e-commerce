'use client'

import { Expand } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
// import usePreviewModal from '@/hooks/use-preview-modal'
import { IFullProduct } from '../interfaces/full-product'
import IconButton from '@/modules/admin/components/icon-button'
import { CldImage } from 'next-cloudinary'
import { formatMoney } from '@/lib/utils'

interface ProductCardProps {
  data: IFullProduct
}

// eslint-disable-next-line no-undef
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  // const previewModal = usePreviewModal()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/admin/products/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()

    // previewModal.onOpen(data)
  }

  return (
    <div
      onClick={handleClick}
      className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'
    >
      <div className='aspect-square rounded-xl bg-gray-100 relative w-[300px] h-[300px]'>
        <CldImage
          src={data?.images?.[0]?.url}
          crop='fill'
          width={300}
          height={300}
          alt='Image'
          className='aspect-square object-cover rounded-md'
        />

        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 justify-center flex'>
          <IconButton
            onClick={onPreview}
            icon={<Expand size={20} className='text-gray-600' />}
          />
        </div>
      </div>

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
