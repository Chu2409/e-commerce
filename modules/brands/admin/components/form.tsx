'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Brand } from '@prisma/client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AlertModal } from '@/components/alert-modal'
import { Heading } from '@/modules/admin/components/heading'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

import { deleteBrand } from '../../shared/actions/delete-brand'
import { createBrand } from '../../shared/actions/create-brand'
import { updateBrand } from '../../shared/actions/update-brand'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' }),
})

interface BrandFormProps {
  initialData: Brand | null
}

export const BrandForm: React.FC<BrandFormProps> = ({ initialData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: '',
        },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const title = initialData ? 'Actualizar marca' : 'Nueva marca'
  const description = initialData ? 'Actualizar marca' : 'Agregar nueva marca'
  const toastMessage = initialData ? 'Marca actualizada' : 'Marca creada'
  const action = initialData ? 'Actualizar' : 'Crear'

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      let result
      if (initialData) {
        result = await updateBrand(initialData.id, data)
      } else {
        result = await createBrand(data)
      }

      if (!result) {
        throw new Error()
      }

      router.push('/admin/brands')
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Algo salió mal')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const deleted = await deleteBrand(initialData?.id!)

      if (!deleted) {
        throw new Error()
      }

      router.push('/admin/brands')
      router.refresh()
      toast.success('Marca eliminada')
    } catch (error) {
      toast.error('Elimine los productos asociados a esta marca primero')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />

      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant='destructive'
            size='sm'
            onClick={() => setIsOpen(true)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>

      <Separator className='my-4' />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className='space-y-8 w-full mt-4'
        >
          <div className='grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Nombre de la marca'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
