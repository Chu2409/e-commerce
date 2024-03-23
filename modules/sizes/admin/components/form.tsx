'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Category, Size } from '@prisma/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { Heading } from '@/modules/admin/components/heading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AlertModal } from '@/modules/shared/components/alert-modal'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Trash } from 'lucide-react'

import { IFullSize } from '../../shared/interfaces/size'
import { updateSizeCategory } from '../../shared/actions/update-size-category'
import { createSizeCategory } from '../../shared/actions/create-size-category'
import { deleteSizeCategory } from '../../shared/actions/delete-size-category'
import { FormGrid } from '@/modules/shared/components/form-grid'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' }),
  value: z.string().min(1, { message: 'Mínimo 1 caracter' }).max(5, {
    message: 'Máximo 5 caracteres',
  }),
  categoryId: z.string().min(1, { message: 'Selecciona una categoría' }),
})

interface SizeFormProps {
  initialData: IFullSize | null
  categories: Category[]
  sizes: Size[]
}

export const SizeForm: React.FC<SizeFormProps> = ({
  initialData,
  categories,
  sizes,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.size.name,
          value: initialData.size.value,
          categoryId: initialData.category.id,
        }
      : {
          name: '',
          value: '',
          categoryId: '',
        },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const title = initialData ? 'Actualizar talla/tamaño' : 'Nueva talla/tamaño'
  const description = initialData
    ? 'Actualizar talla/tamaño'
    : 'Agregar nueva talla/tamaño'
  const toastMessage = initialData
    ? 'Talla/Tamaño actualizada'
    : 'Talla/Tamaño creada'
  const action = initialData ? 'Actualizar' : 'Crear'

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      let result
      if (initialData) {
        result = await updateSizeCategory(initialData.id, data)
      } else {
        result = await createSizeCategory(data)
      }

      if (!result) throw new Error()

      router.push('/admin/sizes')
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
      const deleted = await deleteSizeCategory(initialData?.id!)

      if (!deleted) {
        throw new Error()
      }

      router.push('/admin/sizes')
      router.refresh()
      toast.success('Talla/Marca eliminada')
    } catch (error) {
      toast.error('Elimine los productos asociados a esta talla/marca primero')
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
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    disabled={isLoading || initialData !== null}
                    // eslint-disable-next-line react/jsx-handler-names
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Selecciona una categoría'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className='cursor-pointer'
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Nombre de la talla/tamaño'
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
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Valor de la talla/tamaño'
                      {...field}
                    />
                  </FormControl>
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

      <div className='mt-8'>
        <h2 className='text-lg font-medium tracking-tight mb-2'>
          Tallas/Tamaños disponibles
        </h2>

        <Command
          className='rounded-lg border shadow-md '
          filter={(value, search) => {
            const data = value.split('_')
            const name = data[0]
            const sizeValue = data[1]

            if (
              name.toLowerCase().includes(search.toLowerCase()) ||
              sizeValue.toLowerCase().includes(search.toLowerCase())
            )
              return 1

            return 0
          }}
        >
          <CommandInput placeholder='Buscar talla/tamaño...' />
          <CommandEmpty>Talla/Tamaño no encontrado</CommandEmpty>

          <CommandGroup className='overflow-y-auto max-h-[300px]'>
            {sizes.map((size) => (
              <CommandItem
                key={size.id}
                value={size.name + '_' + size.value}
                className='cursor-pointer'
                onSelect={() => {
                  form.setValue('name', size.name)
                  form.setValue('value', size.value)
                }}
              >
                <div className='flex items-center gap-x-2'>
                  <h3 className='text-sm font-medium'>{size.name}</h3>
                  <p className='text-sm text-gray-500'>{size.value}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </div>
    </>
  )
}
