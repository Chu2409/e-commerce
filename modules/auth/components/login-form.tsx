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
import Image from 'next/image'

const formSchema = z.object({
  dni: z
    .string()
    .regex(/^\d+$/, { message: 'Solo números' })
    .min(10, { message: 'Mínimo 9 caracteres' })
    .max(10, { message: 'Máximo 10 caracteres' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
})

export const LoginForm = ({ redirect }: { redirect?: string }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dni: '',
      password: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)

      const res = await signIn('credentials', {
        dni: values.dni,
        password: values.password,
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
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='px-8 py-6 rounded-lg max-w-lg w-full shadow-lg bg-neutral-950 flex flex-col gap-y-5'
        >
          <div className='flex justify-between'>
            <h1 className='text-4xl font-bold block text-neutral-100'>
              Ingreso
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

          <div className='space-y-4'>
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
          </div>

          <Button
            disabled={isLoading}
            variant='ghost'
            type='submit'
            className='bg-blue-200 hover:bg-blue-300 flex items-center justify-center gap-x-2 rounded-md transition-colors duration-200 ease-in-out w-full'
          >
            Ingresar
            <LogIn className='w-4 h-4' />
          </Button>

          <Link
            href={`/auth/register${redirect ? `?redirect=${redirect}` : ''}`}
            className='ml-auto text-white hover:underline hover:text-blue-200'
          >
            Registrarse
          </Link>
        </form>
      </Form>
    </div>
  )
}
