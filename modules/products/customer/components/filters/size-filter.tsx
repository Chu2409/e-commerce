'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Size } from '@prisma/client'
import qs from 'query-string'
import { Button } from '@/components/ui/button'

interface SizeFilterProps {
  data: Size[]
  name: string
  valueKey: string
}

// eslint-disable-next-line no-undef
const SizeFilter: React.FC<SizeFilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectedValue = searchParams.get(valueKey)

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      [valueKey]: id,
    }

    if (current[valueKey] === id) {
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
        {data.map((filter) => (
          <div key={filter.id} className='flex items-center'>
            <Button
              variant='outline'
              className={cn(
                'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                selectedValue === filter.id && 'bg-black text-white',
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name} - {filter.value}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SizeFilter
