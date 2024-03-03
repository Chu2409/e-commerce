'use client'

import { Brand, Category, Color, PRODUCT_STATE } from '@prisma/client'
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
import { useEffect, useState } from 'react'
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
import { IFullProduct } from '../interfaces/product'
import { ImageUpload } from './image-upload'
import { IFullSize } from '../../sizes/interfaces/size'
import { getSizesByCategory } from '../../sizes/actions/get-sizes-by-category'
import { deleteProduct } from '../actions/delete-product'
import { createProduct } from '../actions/create-products'
import { updateProduct } from '../actions/update-products'

const productStates = Object.values(PRODUCT_STATE).map((state) =>
  state.replace('_', ' '),
)

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(200, { message: 'Máximo 200 caracteres' }),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .positive({ message: 'Precio inválido' })
    .nonnegative({ message: 'Precio inválido' }),
  stock: z.coerce
    .number()
    .int({ message: 'Stock inválido' })
    .nonnegative({ message: 'Stock inválido' }),
  state: z.enum(productStates as any),
  images: z
    .object({ url: z.string() })
    .array()
    .min(1, { message: 'Agrega al menos una imagen' }),
  brandId: z.string().min(1, { message: 'Selecciona una marca' }),
  categoryId: z.string().min(1, { message: 'Selecciona una categoría' }),
  sizeId: z.string().min(1, { message: 'Selecciona una talla/tamaño' }),
  colorId: z.string().min(1, { message: 'Selecciona un color' }),
})

interface ProductFormProps {
  initialData: IFullProduct | null
  brands: Brand[]
  categories: Category[]
  colors: Color[]
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  brands,
  colors,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          state: initialData.state.replace('_', ' '),
          images: initialData.images.map((image) => ({ url: image.url })),
          description: initialData.description || '',
        }
      : {
          name: '',
          description: '',
          price: 0,
          stock: 0,
          state: PRODUCT_STATE.DISPONIBLE,
          images: [],
          brandId: '',
          categoryId: '',
          sizeId: '',
          colorId: '',
        },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [categoryId, setCategoryId] = useState<string | null>(() => {
    return initialData?.category.id || null
  })
  const [sizes, setSizes] = useState<Omit<IFullSize, 'category'>[]>([])

  useEffect(() => {
    form.setValue('sizeId', '')

    if (categoryId) {
      const fetchSizes = async () => {
        const sizes = await getSizesByCategory(categoryId)
        setSizes(sizes)
      }
      fetchSizes()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])

  useEffect(() => {
    form.setValue('sizeId', initialData?.size.id || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = useRouter()

  const title = initialData ? 'Actualizar producto' : 'Nueva producto'
  const description = initialData
    ? 'Actualizar producto'
    : 'Agregar nuevo producto'
  const toastMessage = initialData ? 'Producto actualizado' : 'Producto creado'
  const action = initialData ? 'Actualizar' : 'Crear'

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      let result
      if (initialData) {
        result = await updateProduct(initialData.id, {
          ...data,
          description: data.description || null,
          state: data.state as PRODUCT_STATE,
        })
      } else {
        result = await createProduct({
          ...data,
          description: data.description || null,
          state: data.state as PRODUCT_STATE,
        })
      }

      if (!result) {
        throw new Error()
      }
      router.push('/admin/products')
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
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imágenes</FormLabel>
                <FormControl>
                  <ImageUpload
                    imagesUrl={field.value.map((image) => image.url)}
                    isDisabled={isLoading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      placeholder='Nombre del producto'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
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
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type='number'
                      placeholder='9.99'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type='number'
                      placeholder='3'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
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
                          placeholder='Selecciona una estado'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {productStates.map((state) => (
                        <SelectItem
                          key={state}
                          value={state}
                          className='cursor-pointer'
                        >
                          {state}
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
              control={form.control}
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

            <FormField
              control={form.control}
              name='sizeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Talla/Tamaño</FormLabel>
                  <Select
                    disabled={isLoading || sizes.length === 0}
                    // eslint-disable-next-line react/jsx-handler-names
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Selecciona una talla/tamaño'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {sizes.map((sizeByCategory) => (
                        <SelectItem
                          key={sizeByCategory.id}
                          value={sizeByCategory.id}
                          className='cursor-pointer'
                        >
                          {sizeByCategory.size.name}
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
              name='colorId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
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
                          placeholder='Selecciona un color'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem
                          key={color.id}
                          value={color.id}
                          className='cursor-pointer'
                        >
                          <div className='flex items-center gap-x-2'>
                            {color.name}
                            <div
                              className='w-6 h-6 rounded-full border'
                              style={{ backgroundColor: color.value }}
                            />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
