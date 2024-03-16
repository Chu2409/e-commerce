'use client'

import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

interface CellActionsProps {
  id: string
}

export const OrderCellActions: React.FC<CellActionsProps> = ({ id }) => {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <Button
      variant='ghost'
      onClick={() => router.push(`${pathName}/${id}`)}
      className='p-0 m-0 flex items-center gap-x-2 '
    >
      Editar
      <Edit className='h-4 w-4' />
    </Button>
  )
}
