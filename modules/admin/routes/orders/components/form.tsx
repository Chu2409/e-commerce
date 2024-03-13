'use client'

import { Customer, ORDER_STATE, PAY_METHOD } from '@prisma/client'
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
import { CalendarIcon, ShoppingCart, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IFullOrder } from '../interfaces/order'
import { Calendar } from '@/components/ui/calendar'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, formatDate, formatMoney } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useItems } from '../store/items'
import { CldImage } from 'next-cloudinary'
import { createOrderWithItems } from '../actions/create-order-with-items'
import { updateOrderWithItems } from '../actions/update-order-with-items'
import { deleteOrder } from '../actions/delete-order'

const orderStates = Object.values(ORDER_STATE).map((state) =>
  state.replace('_', ' '),
)

const payMethods = Object.values(PAY_METHOD).map((method) =>
  method.replace('_', ' '),
)

const formSchema = z.object({
  date: z.date(),
  state: z.enum(orderStates as any),
  payMethod: z
    .enum(payMethods as any)
    .optional()
    .nullable(),
  payLimit: z.date().optional().nullable(),
  valuePaid: z.coerce.number().optional().nullable(),
  total: z.coerce.number(),
  finalTotal: z.coerce.number(),
  customerId: z.string().min(1, { message: 'Ingrese un cliente' }),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
      }),
    )
    .min(1, { message: 'Ingrese al menos un producto' }),
})

interface OrderFormProps {
  initialData: IFullOrder | null
  customers: Customer[]
}

export const OrderForm: React.FC<OrderFormProps> = ({
  initialData,
  customers,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          payMethod: initialData.payMethod?.replace('_', ' ') || undefined,
          finalTotal: initialData.finalTotal.toFixed(2) as any,
          items: initialData.items.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
        }
      : {
          date: new Date(),
          state: ORDER_STATE.GENERADO,
          customerId: '',
          items: [],
        },
  })

  const items = useItems((state) => state.productItems)
  const setItems = useItems((state) => state.setProductItems)
  const removeItem = useItems((state) => state.removeProductItem)
  const modifyQuantity = useItems((state) => state.modifyQuantity)

  const [total, setTotal] = useState(0)

  useEffect(() => {
    setItems(initialData?.items || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const total = items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity
    }, 0)
    setTotal(total)
    form.setValue('total', total)

    if (initialData == null || initialData.state === ORDER_STATE.GENERADO) {
      form.setValue('finalTotal', total.toFixed(2) as any)
    }

    form.setValue(
      'items',
      items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const title = initialData ? 'Actualizar orden' : 'Nuevo orden'
  const description = initialData ? 'Actualizar orden' : 'Agregar nueva orden'
  const toastMessage = initialData ? 'Orden actualizado' : 'Orden creada'
  const action = initialData ? 'Actualizar' : 'Crear'

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      let result

      if (initialData) {
        result = await updateOrderWithItems(initialData.id, {
          ...data,
          state: data.state.replace(' ', '_') as ORDER_STATE,
          payLimit: data.payLimit || null,
          payMethod: data.payMethod || null,
          valuePaid: data.valuePaid || null,
        })
      } else {
        result = await createOrderWithItems({
          ...data,
          state: data.state.replace(' ', '_') as ORDER_STATE,
          payLimit: data.payLimit || null,
          payMethod: data.payMethod || null,
          valuePaid: data.valuePaid || null,
        })
      }

      if (result == null) {
        throw new Error()
      }

      router.push('/admin/orders')
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Error al crear la orden')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      if (initialData?.state !== ORDER_STATE.GENERADO) return

      const deleted = await deleteOrder(initialData?.id!)

      if (!deleted) {
        throw new Error()
      }

      router.push('/admin/orders')
      router.refresh()
      toast.success('Orden eliminada')
    } catch (error) {
      toast.error('Algo salió mal')
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
        {initialData && initialData.state === ORDER_STATE.GENERADO && (
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
          className='space-y-8 w-full mt-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-1 min-[1050px]:grid-cols-[1fr_600px] gap-8'>
            <div className='grid gap-8 items-start grid-cols-1 min-[1300px]:grid-cols-2'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id='date'
                            variant='outline'
                            className={cn(
                              'w-full justify-start text-left font-normal flex',
                              !initialData?.date && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value ? (
                              <>{formatDate(field.value)} </>
                            ) : (
                              <span>Selecciona una fecha...</span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            initialFocus
                            captionLayout='dropdown'
                            mode='single'
                            selected={field.value || undefined}
                            onSelect={(date) => field.onChange(date)}
                            fromYear={2023}
                            toYear={2025}
                          />
                        </PopoverContent>
                      </Popover>
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
                        {(initialData == null ||
                          initialData?.state === ORDER_STATE.GENERADO) && (
                          <SelectItem
                            value={orderStates[0]}
                            className='cursor-pointer'
                          >
                            {orderStates[0]}
                          </SelectItem>
                        )}

                        {(initialData == null ||
                          initialData?.state !== ORDER_STATE.FINALIZADO) && (
                          <SelectItem
                            value={orderStates[1]}
                            className='cursor-pointer'
                          >
                            {orderStates[1]}
                          </SelectItem>
                        )}

                        <SelectItem
                          value={orderStates[2]}
                          className='cursor-pointer'
                        >
                          {orderStates[2]}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='payMethod'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de Pago</FormLabel>
                    <Select
                      disabled={isLoading}
                      // eslint-disable-next-line react/jsx-handler-names
                      onValueChange={field.onChange}
                      value={field.value}
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
                        {payMethods.map((payMethod) => (
                          <SelectItem
                            key={payMethod}
                            value={payMethod}
                            className='cursor-pointer'
                          >
                            {payMethod}
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
                name='payLimit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha Límite</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id='date'
                            variant='outline'
                            className={cn(
                              'w-full justify-start text-left font-normal flex',
                              !initialData?.date && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {field.value ? (
                              <>{formatDate(field.value)} </>
                            ) : (
                              <span>Selecciona una fecha límite...</span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            initialFocus
                            captionLayout='dropdown'
                            mode='single'
                            selected={field.value || undefined}
                            onSelect={(date) => field.onChange(date)}
                            fromYear={2023}
                            toYear={2025}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='valuePaid'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Pagado</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ''}
                        disabled={isLoading}
                        type='number'
                        placeholder='Ingrese el valor pagado'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='total'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Total</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        type='number'
                        placeholder='154.99'
                        value={total.toFixed(2)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='finalTotal'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Total Final</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ''}
                        disabled={isLoading}
                        type='number'
                        placeholder='Ingrese el valor total final'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='customerId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
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
                            placeholder='Selecciona un cliente'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem
                            key={customer.id}
                            value={customer.id}
                            className='cursor-pointer'
                          >
                            {customer.firstName} {customer.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name='items'
                render={() => (
                  <FormItem>
                    <FormLabel>Items</FormLabel>
                    <FormControl>
                      <div className='grid gap-y-2 max-h-[400px] overflow-y-auto'>
                        {items.map((item) => (
                          <div
                            key={item.product.id}
                            className='flex items-center justify-between'
                          >
                            <div className='flex items-center'>
                              <div
                                className='relative group'
                                onClick={() => {
                                  if (
                                    initialData == null ||
                                    initialData.state === ORDER_STATE.GENERADO
                                  ) {
                                    removeItem(item.product.id)
                                  }
                                }}
                              >
                                <CldImage
                                  src={
                                    item.product.productColor.images?.[0]?.url
                                  }
                                  crop='fill'
                                  width={90}
                                  height={90}
                                  alt='Image'
                                  className={cn(
                                    'aspect-square object-cover rounded-md w-full h-auto',
                                    (initialData == null ||
                                      initialData.state ===
                                        ORDER_STATE.GENERADO) &&
                                      ' transition duration-300 ease-in-out group-hover:opacity-50',
                                  )}
                                />

                                <div
                                  className={cn(
                                    initialData == null ||
                                      initialData.state === ORDER_STATE.GENERADO
                                      ? 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer'
                                      : 'hidden',
                                  )}
                                >
                                  <Trash className='h-6 w-6' />
                                </div>
                              </div>

                              <div className='ml-2'>
                                <h3 className='text-base font-semibold'>
                                  {item.product.productColor.productMaster.name}
                                </h3>

                                <p className='text-sm text-gray-600'>
                                  Talla:{' '}
                                  <span className='font-medium'>
                                    {item.product.sizeCategory.size.value}
                                  </span>
                                </p>

                                {initialData != null &&
                                initialData.state !== ORDER_STATE.GENERADO ? (
                                  <p className='text-sm text-gray-600'>
                                    Solicitud:{' '}
                                    <span className='font-medium capitalize'>
                                      {item?.state
                                        ?.replace('_', ' ')
                                        .toLowerCase()}
                                    </span>
                                  </p>
                                ) : (
                                  <>
                                    <p className='text-sm text-gray-600'>
                                      Stock:{' '}
                                      <span className='font-medium'>
                                        {item.product.stock}
                                      </span>
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                      Estado:{' '}
                                      <span className='capitalize font-medium'>
                                        {item.product.state
                                          .replace('_', ' ')
                                          .toLowerCase()}
                                      </span>
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className='flex items-center gap-4'>
                              <Input
                                type='number'
                                value={item.quantity}
                                disabled={
                                  isLoading ||
                                  (initialData != null &&
                                    initialData.state !== ORDER_STATE.GENERADO)
                                }
                                min={1}
                                max={
                                  item.product.stock === 0
                                    ? 10
                                    : item.product.stock
                                }
                                onChange={(e) => {
                                  modifyQuantity(
                                    item.product.id,
                                    +e.target.value,
                                  )
                                }}
                                className='w-[60px] h-[30px] rounded-md'
                              />

                              <p className='text-sm font-semibold'>
                                {formatMoney(
                                  item.product.price * item.quantity,
                                )}
                              </p>
                              <ShoppingCart className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </div>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button disabled={isLoading} type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
