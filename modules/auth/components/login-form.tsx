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

const formSchema = z.object({
  dni: z
    .string()
    .regex(/^\d+$/, { message: 'Solo números' })
    .min(10, { message: 'Mínimo 9 caracteres' })
    .max(10, { message: 'Máximo 10 caracteres' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
})

export const LoginForm = () => {
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

      router.push('/admin')
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
          className='p-8 rounded-lg max-w-lg w-full shadow-lg bg-neutral-950 flex flex-col gap-y-6'
        >
          <h1 className='text-4xl font-bold block text-neutral-100'>Ingreso</h1>

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
                  <Input placeholder='**********' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            variant='ghost'
            type='submit'
            className='bg-blue-200 hover:bg-blue-300 flex items-center justify-center gap-x-2 rounded-md transition-colors duration-200 ease-in-out w-full'
          >
            Ingresar
            <LogIn className='w-4 h-4' />
          </Button>
        </form>
      </Form>
    </div>
  )
}
