'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Category } from '@prisma/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AlertModal } from '@/modules/shared/components/alert-modal'
import { Heading } from '@/modules/admin/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Trash } from 'lucide-react'

import { deleteCategory } from '../../shared/actions/delete-category'
import { updateCategory } from '../../shared/actions/update-category'
import { createCategory } from '../../shared/actions/create-category'
import { FormGrid } from '@/modules/shared/components/form-grid'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' }),
  masterCategoryId: z.string().optional().nullable(),
})

interface CategoryFormProps {
  initialData: Category | null
  masterCategories: Category[]
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  masterCategories,
}) => {
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

  const title = initialData ? 'Actualizar categoría' : 'Nueva categoría'
  const description = initialData
    ? 'Actualizar categoría'
    : 'Agregar nueva categoría'
  const toastMessage = initialData
    ? 'Categoría actualizada'
    : 'Categoría creada'
  const action = initialData ? 'Actualizar categoría' : 'Crear categoría'

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      let result
      if (initialData) {
        result = await updateCategory(initialData.id, data)
      } else {
        result = await createCategory(data)
      }

      if (!result) throw new Error()

      router.push('/admin/categories')
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
      const deleted = await deleteCategory(initialData?.id!)

      if (!deleted) throw new Error()

      router.push('/admin/categories')
      router.refresh()
      toast.success('Categoría eliminada')
    } catch (error) {
      toast.error(
        'Elimine los productos y tamaños asociados a esta categoría primero',
      )
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
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <FormGrid>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Nombre de la categoría'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='masterCategoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría Maestra</FormLabel>
                  <Select
                    disabled={isLoading}
                    // eslint-disable-next-line react/jsx-handler-names
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una categoría maestra' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {masterCategories.map((masterCategory) => (
                        <SelectItem
                          key={masterCategory.id}
                          value={masterCategory.id}
                          className='cursor-pointer'
                        >
                          {masterCategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>

          <Button disabled={isLoading} type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
