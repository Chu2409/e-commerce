'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import qs from 'query-string'
import { Button } from '@/components/ui/button'
import { PRODUCT_GENDER } from '@prisma/client'

interface GenderFilterProps {
  name: string
  valueKey: string
}

const genders = Object.values(PRODUCT_GENDER)

const GenderFilter: React.FC<GenderFilterProps> = ({ name, valueKey }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectedValue = searchParams.get(valueKey)

  const onClick = (name: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      [valueKey]: name,
    }

    if (current[valueKey] === name) {
      query[valueKey] = null
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    )

    router.push(url)
  }

  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold'>{name}</h3>

      <hr className='my-4' />

      <div className='flex flex-wrap gap-2'>
        {genders.map((gender) => (
          <div key={gender} className='flex items-center'>
            <Button
              variant='outline'
              className={cn(
                'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 capitalize',
                selectedValue === gender && 'bg-black text-white',
              )}
              onClick={() => onClick(gender)}
            >
              {gender.toLowerCase().replace('_', ' ')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GenderFilter
