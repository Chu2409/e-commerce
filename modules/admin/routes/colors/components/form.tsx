'use client'

import { Color } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SketchPicker } from 'react-color'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AlertModal } from '@/components/alert-modal'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { updateColor } from '../actions/update-color'
import { createColor } from '../actions/create-color'
import { deleteColor } from '../actions/delete-color'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Mínimo 2 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' }),
  value: z
    .string()
    .min(7, { message: 'Mínimo 7 caracteres' })
    .max(7, { message: 'Máximo 7 caracteres' }),
  active: z.boolean().default(true),
})

interface ColorFormProps {
  initialData: Color | null
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: '',
          value: '#1ec9c9',
          active: true,
        },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const title = initialData ? 'Actualizar color' : 'Nuevo color'
  const description = initialData ? 'Actualizar color' : 'Agregar nuevo color'
  const toastMessage = initialData ? 'Color actualizado' : 'Color creado'
  const action = initialData ? 'Actualizar' : 'Crear'

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      let result
      if (initialData) {
        result = await updateColor(initialData.id, data)
      } else {
        result = await createColor(data)
      }

      if (!result) {
        throw new Error()
      }

      router.push('/admin/colors')
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
      const deleted = await deleteColor(initialData?.id!)

      if (!deleted) {
        throw new Error()
      }

      router.push('/admin/colors')
      router.refresh()
      toast.success('Color eliminado')
    } catch (error) {
      toast.error('Elimine los productos asociados a este color primero')
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
          <div className='grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 items-start'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Nombre del color'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='value'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div
                        className='rounded-md border p-5 w-[200px] cursor-pointer'
                        style={{ backgroundColor: field.value }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className='flex m-0 p-0 w-full'>
                      <SketchPicker
                        color={field.value}
                        onChangeComplete={(color) => field.onChange(color.hex)}
                        disableAlpha
                        className='m-0 p-0 w-full'
                        presetColors={[]}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='active'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // eslint-disable-next-line react/jsx-handler-names
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className='space-y-1 leading-none'>
                    <FormLabel>Activo</FormLabel>
                    <FormDescription>
                      Esta color estará disponible para su uso
                    </FormDescription>
                  </div>
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
