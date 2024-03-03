'use client'

import { Brand, Category } from '@prisma/client'
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
import { AlertModal } from '@/components/alert-modal'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IFullProductMaster } from '../interfaces/product'
import { cn } from '@/lib/utils'

const productMasterFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(200, { message: 'Máximo 200 caracteres' }),
  description: z.string().optional(),
  brandId: z.string().min(1, { message: 'Selecciona una marca' }),
  categoryId: z.string().min(1, { message: 'Selecciona una categoría' }),
})

interface FullProductFormProps {
  initialData: IFullProductMaster | null
  brands: Brand[]
  categories: Category[]
}

export const FullProductForm: React.FC<FullProductFormProps> = ({
  initialData,
  categories,
  brands,
}) => {
  const productMasterForm = useForm<z.infer<typeof productMasterFormSchema>>({
    resolver: zodResolver(productMasterFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          description: initialData.description || '',
        }
      : {
          name: '',
          description: '',
          brandId: '',
          categoryId: '',
        },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [categoryId, setCategoryId] = useState<string | null>(() => {
    return initialData?.category.id || null
  })
  // const [sizes, setSizes] = useState<Omit<IFullSize, 'category'>[]>([])

  // useEffect(() => {
  //   form.setValue('sizeId', '')

  //   if (categoryId) {
  //     const fetchSizes = async () => {
  //       const sizes = await getSizesByCategory(categoryId)
  //       setSizes(sizes)
  //     }
  //     fetchSizes()
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [categoryId])

  // useEffect(() => {
  //   form.setValue('sizeId', initialData?.size.id || '')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const router = useRouter()

  const title = initialData ? 'Actualizar producto' : 'Nueva producto'
  const description = initialData
    ? 'Actualizar producto'
    : 'Agregar nuevo producto'
  const toastMessage = initialData ? 'Producto actualizado' : 'Producto creado'
  const action = initialData ? 'Actualizar' : 'Crear'

  const handleProductMasterSubmit = async (
    data: z.infer<typeof productMasterFormSchema>,
  ) => {
    try {
      const result = await updateProduct(initialData?.id, {
        ...data,
        description: data.description || null,
      })

      if (!result) {
        throw new Error()
      }
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
      const deleted = await deleteProduct(initialData?.id!)

      if (!deleted) {
        throw new Error()
      }

      router.push('/admin/products')
      router.refresh()
      toast.success('Producto eliminado')
    } catch (error) {
      toast.error('Elimine las órdenes asociadas a este producto')
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

      <div className='flex flex-col gap-y-4'>
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

        <Separator />

        <Form {...productMasterForm}>
          <form
            onSubmit={productMasterForm.handleSubmit(handleProductMasterSubmit)}
            className='space-y-6 w-full mt-4'
          >
            <h2 className='text-xl font-semibold tracking-tight'>
              Información Principal
            </h2>

            <div className='grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1'>
              <FormField
                control={productMasterForm.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder='Nombre del producto'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={productMasterForm.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder='Descripción del producto'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={productMasterForm.control}
                name='brandId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Selecciona una marca'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem
                            key={brand.id}
                            value={brand.id}
                            className='cursor-pointer'
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={productMasterForm.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={(value) => {
                        field.onChange(value)
                        setCategoryId(value)
                      }}
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
            </div>

            <Button
              disabled={isLoading}
              type='submit'
              className={cn({
                'bg-primary': !isLoading,
                'bg-muted-foreground': isLoading,
              })}
            >
              {action}
            </Button>
          </form>
        </Form>

        <Separator />

        <Form {...productMasterForm}>
          <form
            onSubmit={productMasterForm.handleSubmit(handleProductMasterSubmit)}
            className='space-y-8 w-full mt-4'
          >
            <h2 className='text-xl font-semibold tracking-tight'>
              Variaciones
            </h2>

            <div className='grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1'>
              <FormField
                control={productMasterForm.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder='Nombre del producto'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={productMasterForm.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder='Descripción del producto'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={productMasterForm.control}
                name='brandId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Selecciona una marca'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem
                            key={brand.id}
                            value={brand.id}
                            className='cursor-pointer'
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={productMasterForm.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={(value) => {
                        field.onChange(value)
                        setCategoryId(value)
                      }}
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
            </div>

            <Separator />

            <h2 className='text-xl font-semibold tracking-tight'>
              Variaciones
            </h2>

            <Button disabled={isLoading} type='submit'>
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
