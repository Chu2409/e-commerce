'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import { AlertModal } from '@/components/alert-modal'

interface CellActionsProps {
  id: string
  message: string
  errorMessage?: string
  refresh?: boolean
  onDelete: (id: string) => Promise<boolean>
}

export const CellActions: React.FC<CellActionsProps> = ({
  id,
  message,
  onDelete,
  refresh,
  errorMessage,
}) => {
  const router = useRouter()
  const pathName = usePathname()

  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onDeleteClick = async () => {
    try {
      setIsLoading(true)
      const deleted = await onDelete(id)

      if (deleted) {
        toast.success(message)
        if (refresh) {
          window.location.reload()
        }
        router.refresh()
      } else {
        throw new Error()
      }
    } catch (error) {
      toast.error(errorMessage || 'Error al eliminar')
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
        onConfirm={onDeleteClick}
      />

      <Button
        variant='ghost'
        onClick={() => router.push(`${pathName}/${id}`)}
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
