'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  Brand,
  Category,
  Color,
  PRODUCT_GENDER,
  PRODUCT_STATE,
} from '@prisma/client'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'

import { ImageUpload } from './image-upload'
import { Heading } from '@/modules/admin/components/heading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { Plus } from 'lucide-react'

import { IFullSize } from '@/modules/sizes/shared/interfaces/size'
import { getSizesByCategory } from '@/modules/sizes/shared/actions/get-sizes-by-category'
import {
  IFullProduct,
  IFullProductColor,
  IFullProductMaster,
} from '../../shared/interfaces/product'
import { updateProductMaster } from '../../shared/actions/update-product-master'
import { updateProductColor } from '../../shared/actions/update-product-color'
import { createProductMaster } from '../../shared/actions/create-product-master'
import { createProductColor } from '../../shared/actions/create-product-color'
import { createProduct } from '../../shared/actions/create-product'
import { updateProduct } from '../../shared/actions/update-product'
import { FormGrid } from '@/modules/shared/components/form-grid'

const productGenders = Object.values(PRODUCT_GENDER).map((state) =>
  state.replace('_', ' '),
)

const productStates = Object.values(PRODUCT_STATE).map((state) =>
  state.replace('_', ' '),
)

const productMasterFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .max(200, { message: 'Máximo 200 caracteres' }),
  description: z.string().optional().nullable(),
  brandId: z.string().min(1, { message: 'Selecciona una marca' }),
  categoryId: z.string().min(1, { message: 'Selecciona una categoría' }),
  gender: z
    .enum(productGenders as any)
    .optional()
    .nullable(),
})

const productColorFormSchema = z.object({
  colorId: z.string().optional().nullable(),
  images: z
    .object({ url: z.string() })
    .array()
    .min(1, { message: 'Agrega al menos una imagen' }),
})

const productFormSchema = z.object({
  sizeCategoryId: z.string().optional().nullable(),
  price: z.coerce
    .number({ invalid_type_error: 'Precio inválido' })
    .positive({ message: 'Precio inválido' })
    .nonnegative({ message: 'Precio inválido' }),
  stock: z.coerce
    .number({ invalid_type_error: 'Precio inválido' })
    .int({ message: 'Stock inválido' })
    .nonnegative({ message: 'Stock inválido' }),
  state: z.enum(productStates as any),
})

interface FullProductFormProps {
  initialProductMaster: IFullProductMaster | null
  selectedProductId?: string
  brands: Brand[]
  categories: Category[]
  colors: Color[]
  sizesCategories: Omit<IFullSize, 'category'>[]
}

export const FullProductForm: React.FC<FullProductFormProps> = ({
  initialProductMaster,
  selectedProductId,
  categories,
  brands,
  colors,
  sizesCategories,
}) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const [mainProductColor, setMainProductColor] =
    useState<IFullProductColor | null>(
      initialProductMaster?.productsColors.find((productColor) =>
        productColor.products.find(
          (product) => product.id === selectedProductId,
        ),
      ) || null,
    )

  const [mainProduct, setMainProduct] = useState<IFullProduct | null>(
    mainProductColor?.products.find(
      (product) => product.id === selectedProductId,
    ) || null,
  )

  const colorsAvailable = colors.filter(
    (color) =>
      !initialProductMaster?.productsColors.some((productColor) => {
        if (mainProductColor && productColor.id === mainProductColor.id)
          return false
        return productColor.colorId === color.id
      }),
  )

  const [sizesAvailable, setSizesAvailable] = useState<
    Omit<IFullSize, 'category'>[]
  >([])

  const productMasterForm = useForm<z.infer<typeof productMasterFormSchema>>({
    resolver: zodResolver(productMasterFormSchema),
    defaultValues: initialProductMaster
      ? {
          ...initialProductMaster,
        }
      : {
          name: '',
          brandId: '',
          categoryId: '',
        },
  })

  const productColorForm = useForm<z.infer<typeof productColorFormSchema>>({
    resolver: zodResolver(productColorFormSchema),
    defaultValues: mainProductColor
      ? {
          ...mainProductColor,
        }
      : {
          images: [],
        },
  })

  const productForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: mainProduct
      ? {
          ...mainProduct,
          state: mainProduct.state.replace('_', ' '),
        }
      : {
          stock: 1,
          state: PRODUCT_STATE.DISPONIBLE,
        },
  })

  useEffect(() => {
    if (!mainProductColor) {
      const categoryId = productMasterForm.getValues('categoryId')
      const fetchSizes = async () => {
        if (categoryId) {
          const sizes = await getSizesByCategory(categoryId)
          setSizesAvailable(sizes)
        }
      }
      fetchSizes()
    }

    return () => {
      setSizesAvailable([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productMasterForm.watch('categoryId'), mainProductColor])

  useEffect(() => {
    if (mainProductColor) {
      setSizesAvailable(
        sizesCategories.filter(
          (sizeCategory) =>
            !mainProductColor.products.some((product) => {
              if (mainProduct && product.id === mainProduct.id) return false
              return product.sizeCategoryId === sizeCategory.id
            }),
        ),
      )
    }

    return () => {
      setSizesAvailable([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainProduct])

  useEffect(() => {
    const state = productForm.getValues('state')

    if (state !== PRODUCT_STATE.DISPONIBLE) {
      productForm.setValue('stock', 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForm.watch('state')])

  const title = initialProductMaster ? 'Actualizar producto' : 'Nueva producto'
  const description = initialProductMaster
    ? 'Actualizar producto'
    : 'Agregar nuevo producto'
  const action = initialProductMaster ? 'Actualizar producto' : 'Crear producto'

  const handleProductMasterUpdate = async (
    data: z.infer<typeof productMasterFormSchema>,
  ) => {
    try {
      setIsLoading(true)

      const productMaster = await updateProductMaster(
        initialProductMaster?.id!,
        {
          ...data,
          description: data.description || null,
          gender: data.gender != null ? data.gender : null,
        },
      )
      if (!productMaster) throw new Error()

      router.refresh()
      toast.success('Información principal actualizada')
    } catch (error) {
      toast.error('Algo salió mal')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductColorUpdate = async (
    data: z.infer<typeof productColorFormSchema>,
  ) => {
    try {
      setIsLoading(true)

      const productColor = await updateProductColor(mainProductColor?.id!, {
        ...data,
      })

      if (!productColor) throw new Error()

      router.refresh()
      toast.success('Variación principal actualizada')
    } catch (error) {
      toast.error('Algo salió mal')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductSubmit = async (
    data: z.infer<typeof productFormSchema>,
  ) => {
    try {
      setIsLoading(true)

      if (mainProductColor == null && mainProduct == null) {
        const productColorFormSubmit = await productColorForm.trigger()
        if (!productColorFormSubmit) return

        const productColorData = productColorForm.getValues()
        const productColor = await createProductColor({
          ...productColorData,
          productMasterId: initialProductMaster?.id!,
        })

        const product = await createProduct({
          ...data,
          productColorId: productColor?.id!,
          state: data.state as PRODUCT_STATE,
          sizeCategoryId: data.sizeCategoryId || null,
        })

        if (!product || !productColor) throw new Error()

        toast.success('Variación creada')
        router.push(`/admin/products/${product.id}`)
      } else if (mainProduct == null) {
        const product = await createProduct({
          ...data,
          productColorId: mainProductColor?.id!,
          state: data.state as PRODUCT_STATE,
          sizeCategoryId: data.sizeCategoryId || null,
        })

        if (!product) throw new Error()

        toast.success('Variación secundaria creada')
        router.push(`/admin/products/${product.id}`)
      } else {
        const result = await updateProduct(mainProduct?.id!, {
          ...data,
          state: data.state as PRODUCT_STATE,
          sizeCategoryId: data.sizeCategoryId || null,
        })
        if (!result) throw new Error()

        toast.success('Variación secundaria actualizada')
      }

      router.refresh()
    } catch (error) {
      toast.error('Algo salió mal')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProductFormSubmit = async () => {
    try {
      setIsLoading(true)

      const productMasterFromSubmit = await productMasterForm.trigger()
      const productColorFormSubmit = await productColorForm.trigger()
      const productFormSubmit = await productForm.trigger()

      if (
        !productMasterFromSubmit ||
        !productColorFormSubmit ||
        !productFormSubmit
      )
        return

      const productMasterData = productMasterForm.getValues()
      const productColorData = productColorForm.getValues()
      const productData = productForm.getValues()

      const productMaster = await createProductMaster({
        ...productMasterData,
        description: productMasterData.description || null,
        gender:
          productMasterData.gender != null ? productMasterData.gender : null,
      })

      const productColor = await createProductColor({
        ...productColorData,
        productMasterId: productMaster?.id!,
      })

      const product = await createProduct({
        stock: parseFloat(String(productData.stock)),
        price: parseFloat(String(productData.price)),
        productColorId: productColor?.id!,
        state: productData.state as PRODUCT_STATE,
        sizeCategoryId: productData.sizeCategoryId || null,
      })

      if (!product || !productColor || !productMaster) throw new Error()

      toast.success('Producto creado')
      router.push(`/admin/products`)
      router.refresh()
    } catch (error) {
      toast.error('Algo salió mal')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Heading title={title} description={description} />

      <Separator className='my-4' />

      <Form {...productMasterForm}>
        <form
          onSubmit={productMasterForm.handleSubmit(handleProductMasterUpdate)}
          className='space-y-6 w-full my-4'
        >
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold tracking-tight'>
              Información Principal
            </h2>

            <Button
              onClick={(e) => {
                e.preventDefault()
                router.push('/admin/products/new')
                e.stopPropagation()
              }}
              className={cn('ml-4', initialProductMaster ? 'flex' : 'hidden')}
            >
              <Plus className='mr-2 h-4 w-4' />
              Nuevo Producto
            </Button>
          </div>

          <FormGrid>
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
                      {...field}
                      disabled={isLoading}
                      placeholder='Descripción del producto'
                      value={field.value || undefined}
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
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una marca' />
                      </SelectTrigger>

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
                  </FormControl>
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
                  <FormControl>
                    <Select
                      disabled={isLoading || initialProductMaster != null}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una categoría' />
                      </SelectTrigger>

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
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productMasterForm.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una género' />
                      </SelectTrigger>

                      <SelectContent>
                        {productGenders.map((gender) => (
                          <SelectItem
                            key={gender}
                            value={gender}
                            className='cursor-pointer'
                          >
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>

          <Button
            disabled={isLoading}
            type='submit'
            className={cn(initialProductMaster ? 'block' : 'hidden')}
          >
            {action}
          </Button>
        </form>
      </Form>

      <Separator className='my-4' />

      <Form {...productColorForm}>
        <form
          onSubmit={productColorForm.handleSubmit(handleProductColorUpdate)}
          className='space-y-8 w-full my-4'
        >
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold tracking-tight'>
                Información Adicional
              </h2>
              <p className='text-sm text-muted-foreground'>
                Administra las variaciones de colores y sus imágenes
              </p>
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setMainProductColor(null)
                setMainProduct(null)
                productColorForm.setValue('colorId', '')
                productColorForm.setValue('images', [])
                productForm.setValue('sizeCategoryId', '')
                productForm.setValue('price', '' as any)
                productForm.setValue('stock', 1)
                productForm.setValue('state', PRODUCT_STATE.DISPONIBLE)
              }}
              className={cn('ml-4', initialProductMaster ? 'flex' : 'hidden')}
            >
              <Plus className='mr-2 h-4 w-4' />
              Nueva Variación Principal
            </Button>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            <FormField
              control={productColorForm.control}
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
                          ...field.value.filter(
                            (current) => current.url !== url,
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productColorForm.control}
              name='colorId'
              render={({ field }) => (
                <FormItem className='w-[300px] lg:ml-8'>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un color' />
                      </SelectTrigger>

                      <SelectContent>
                        {colorsAvailable.map((color) => (
                          <SelectItem
                            key={color.id}
                            value={color.id}
                            className='cursor-pointer'
                          >
                            <div className='flex items-center gap-x-2'>
                              {color.name}
                              <div
                                className='w-6 h-6 rounded-full border border-black border-opacity-30'
                                style={{ backgroundColor: color.value }}
                              />
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={isLoading}
            type='submit'
            className={cn(
              initialProductMaster && mainProductColor != null
                ? 'block'
                : 'hidden',
            )}
          >
            {action}
          </Button>
        </form>
      </Form>

      <Separator className='my-4' />

      <Form {...productForm}>
        <form
          onSubmit={productForm.handleSubmit(handleProductSubmit)}
          className='space-y-8 w-full my-4'
        >
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold tracking-tight'>
                Variaciones
              </h2>
              <p className='text-sm text-muted-foreground'>
                Administra los precios, stock, estado y tallas/tamaños de las
                variaciones de colores
              </p>
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setMainProduct(null)
                productForm.setValue('sizeCategoryId', '')
                productForm.setValue('price', 0)
                productForm.setValue('stock', 0)
                productForm.setValue('state', PRODUCT_STATE.DISPONIBLE)
              }}
              className={cn(
                'ml-4',
                initialProductMaster && mainProductColor != null
                  ? 'flex'
                  : 'hidden',
              )}
            >
              <Plus className='mr-2 h-4 w-4' />
              Nueva Variación Secundaria
            </Button>
          </div>

          <FormGrid>
            <FormField
              control={productForm.control}
              name='sizeCategoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Talla/Tamaño</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading || sizesAvailable.length === 0}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una talla/tamaño' />
                      </SelectTrigger>

                      <SelectContent>
                        {sizesAvailable.map((sizeCategory) => (
                          <SelectItem
                            key={sizeCategory.id}
                            value={sizeCategory.id}
                            className='cursor-pointer'
                          >
                            {sizeCategory.size.name} - {sizeCategory.size.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={productForm.control}
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
              control={productForm.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      disabled={
                        isLoading ||
                        productForm.getValues('state') !==
                          PRODUCT_STATE.DISPONIBLE
                      }
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
              control={productForm.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una estado' />
                      </SelectTrigger>

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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormGrid>

          <Button
            disabled={isLoading}
            type='submit'
            className={cn(initialProductMaster ? 'block' : 'hidden')}
          >
            {mainProduct !== null ? 'Actualizar' : 'Crear'}
          </Button>
        </form>
      </Form>

      <div className='ml-auto'>
        <Button
          disabled={isLoading}
          type='submit'
          className={cn(
            'mt-6 w-[200px]',
            initialProductMaster == null ? 'flex' : 'hidden',
          )}
          onClick={handleProductFormSubmit}
        >
          <Plus className='mr-2 h-4 w-4' />
          Crear Producto
        </Button>
      </div>
    </>
  )
}
