'use client'

import { Customer } from '@prisma/client'
import { useForm } from 'react-hook-form'
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
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { updateCustomer } from '../../shared/actions/update-customer'
import { createCustomer } from '../../shared/actions/create-customer'
import { deleteCustomer } from '../../shared/actions/delete-customer'
import { FormGrid } from '@/modules/shared/components/form-grid'

const formSchema = z.object({
  dni: z
    .string()
    .regex(/^\d+$/, { message: 'Solo números' })
    .min(10, { message: 'Mínimo 9 caracteres' })
    .max(10, { message: 'Máximo 10 caracteres' }),
  firstName: z
    .string()
    .min(2, { message: 'Mínimo 2 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' }),
  lastName: z
    .string()
    .min(2, { message: 'Mínimo 2 caracteres' })
    .max(100, { message: 'Máximo 100 caracteres' }),
  phoneNumber: z
    .string()
    .min(9, { message: 'Mínimo 9 caracteres' })
    .max(15, { message: 'Máximo 15 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  city: z.string().optional(),
})

interface CustomerFormProps {
  initialData: Customer | null
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ initialData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          city: initialData.city || '',
        }
      : {
          dni: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          city: '',
        },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const title = initialData ? 'Actualizar cliente' : 'Nuevo cliente'
  const description = initialData
    ? 'Actualizar cliente'
    : 'Agregar nuevo cliente'
  const toastMessage = initialData ? 'Cliente actualizado' : 'Cliente creado'
  const action = initialData ? 'Actualizar cliente' : 'Crear cliente'

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      let result
      if (initialData) {
        result = await updateCustomer(initialData.id, data)
      } else {
        result = await createCustomer(data)
      }

      if (!result) throw new Error()

      router.push('/admin/customers')
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
      const deleted = await deleteCustomer(initialData?.id!)

      if (!deleted) throw new Error()

      router.push('/admin/customers')
      router.refresh()
      toast.success('Cliente eliminado')
    } catch (error) {
      toast.error('Elimine las órdenes asociadas a este cliente primero')
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
              name='dni'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Cédula de identidad del cliente'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Nombre del cliente'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Apellido del cliente'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Teléfono del cliente'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Correo del cliente'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Ciudad del cliente'
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
    </>
  )
}
