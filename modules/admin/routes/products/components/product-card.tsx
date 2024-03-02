'use client'

import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import { formatMoney } from '@/lib/utils'
import { IFullProductMaster } from '../interfaces/full-product'

interface ProductCardProps {
  productsMasters: IFullProductMaster
}

const ProductCard: React.FC<ProductCardProps> = ({ productsMasters }) => {
  const router = useRouter()

  const mainProduct = productsMasters.products[0]
  const colors = productsMasters.products.map((product) => product.color.value)
  const sizes = productsMasters.products
    .map((product) => product.size.size.value)
    .filter((value, index, self) => self.indexOf(value) === index)

  const handleClick = () => {
    router.push(`/admin/products/${productsMasters.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className='bg-[#f6f6f6] w-[300px] group cursor-pointer rounded-xl border p-3 space-y-4 hover:drop-shadow-lg transition-shadow duration-300'
    >
      <CldImage
        src={mainProduct.images?.[0]?.url}
        crop='fill'
        width={300}
        height={300}
        alt='Image'
        className='aspect-square object-cover rounded-md overflow-hidden group-hover:scale-110 group-hover:rounded-xl transition-transform duration-300'
      />

      <div>
        <p className='font-semibold text-lg'>{productsMasters.name}</p>

        <div className='flex gap-2 items-center'>
          <div className='text-sm text-gray-500'>Tallas disponibles:</div>
          {sizes.map((size, index) => (
            <div key={index} className='text-sm text-gray-600'>
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between font-semibold '>
        {formatMoney(mainProduct.price)}

        <div className='flex gap-1'>
          {colors.map((color, index) => (
            <div
              key={index}
              className='w-4 h-4 rounded-full border'
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
