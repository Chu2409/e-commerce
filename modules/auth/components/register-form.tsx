'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { createCustomer } from '@/modules/customers/shared/actions/create-customer'
import Image from 'next/image'

const formSchema = z.object({
  dni: z
    .string()
    .regex(/^\d+$/, { message: 'Solo números' })
    .min(10, { message: 'Mínimo 9 caracteres' })
    .max(10, { message: 'Máximo 10 caracteres' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),

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

export const RegisterForm = ({ redirect }: { redirect?: string }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      city: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      const result = await createCustomer(data)

      if (!result) throw new Error('Error al crear el cliente')

      const res = await signIn('credentials', {
        dni: data.dni,
        password: data.password,
        redirect: false,
      })

      if (res?.error) throw new Error(res?.error)

      router.push(redirect || '/')
      router.refresh()
      toast.success('Bienvenido!')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center my-auto h-full '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='px-8 py-6 rounded-lg max-w-2xl w-full shadow-lg bg-neutral-950 flex flex-col gap-y-5'
        >
          <div className='flex justify-between'>
            <h1 className='text-4xl font-bold block text-neutral-100'>
              Registro
            </h1>

            <Link
              href='/'
              className='text-base font-extrabold hover:scale-105 transition-transform duration-200 ease-in-out text-white text-center px-6 max-w-[260px] w-full flex items-center gap-4'
            >
              <Image
                src='/icon.png'
                alt='Website Icon'
                width={24}
                height={24}
                className='w-6 h-6 align-middle '
              />
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </Link>
          </div>

          <div className='grid lg:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='dni'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-neutral-100'>Cédula</FormLabel>
                  <FormControl>
                    <Input placeholder='1442121323' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-neutral-100'>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='**********'
                      type='password'
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
                  <FormLabel className='text-neutral-100'>Nombre</FormLabel>
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
                  <FormLabel className='text-neutral-100'>Apellido</FormLabel>
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
                  <FormLabel className='text-neutral-100'>Teléfono</FormLabel>
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
                  <FormLabel className='text-neutral-100'>Correo</FormLabel>
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
                  <FormLabel className='text-neutral-100'>Ciudad</FormLabel>
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
          </div>

          <Button
            disabled={isLoading}
            variant='ghost'
            type='submit'
            className='bg-blue-200 hover:bg-blue-300 flex items-center justify-center gap-x-2 rounded-md transition-colors duration-200 ease-in-out w-full'
          >
            Registrarse
            <LogIn className='w-4 h-4' />
          </Button>

          <Link
            href={`/auth/login${redirect ? `?redirect=${redirect}` : ''}`}
            className='ml-auto text-white hover:underline hover:text-blue-200'
          >
            Ingresar
          </Link>
        </form>
      </Form>
    </div>
  )
}
