'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import { AlertModal } from '@/components/alert-modal'
import { Order } from '@prisma/client'

interface OrdersCellActionsProps {
  order: Order
}

export const OrdersCellActions: React.FC<OrdersCellActionsProps> = ({
  order,
}) => {
  const router = useRouter()
  const pathName = usePathname()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)
      // await axios.delete(`/api/${params.storeId}/products/${data.id}`)
      router.refresh()
      toast.success('Product deleted')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <div className='flex gap-x-4'>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />

      <Button
        variant='ghost'
        onClick={() => router.push(`${pathName}/${order.id}`)}
        className='p-0'
      >
        <Edit className='h-4 w-4' />
      </Button>

      <Button variant='ghost' onClick={() => setIsOpen(true)} className='p-0'>
        <Trash className='h-4 w-4' />
      </Button>
    </div>
  )
}
