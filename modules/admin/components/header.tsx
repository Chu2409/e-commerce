'use client'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface HeaderProps {
  title: string
  description: string
  buttonLabel: string
}

export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  buttonLabel,
}) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className='flex items-center justify-between'>
      <Heading title={title} description={description} />

      <Button onClick={() => router.push(`${pathname}/new`)} className='ml-4'>
        <Plus className='mr-2 h-4 w-4' />
        {buttonLabel}
      </Button>
    </div>
  )
}
