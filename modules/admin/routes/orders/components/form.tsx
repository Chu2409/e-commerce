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
import { CalendarIcon, Trash } from 'lucide-react'
import { useState } from 'react'
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
import { cn, formatDate } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderStates = Object.values(ORDER_STATE).map((state) =>
  state.replace('_', ' '),
)

const payMethods = Object.values(PAY_METHOD).map((method) =>
  method.replace('_', ' '),
)

const formSchema = z.object({
  date: z.date().optional(),
  state: z.enum(orderStates as any),
  payMethod: z.enum(payMethods as any).optional(),
  payLimit: z.date().optional(),
  valuePaid: z.number().optional(),
  total: z.number().optional(),
  finalTotal: z.number().optional(),
  customerId: z.string().min(1, { message: 'Ingrese un cliente' }),
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
          date: initialData.date || undefined,
          payMethod: initialData.payMethod || undefined,
          payLimit: initialData.payLimit || undefined,
          valuePaid: initialData.valuePaid || undefined,
          total: initialData.total || undefined,
          finalTotal: initialData.finalTotal || undefined,
        }
      : {
          state: ORDER_STATE.CANCELADO,
          customerId: '',
        },
  })

  const [total, setTotal] = useState(0)

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const title = initialData ? 'Actualizar orden' : 'Nuevo orden'
  const description = initialData ? 'Actualizar orden' : 'Agregar nueva orden'
  const toastMessage = initialData ? 'Orden actualizado' : 'Orden creada'
  const action = initialData ? 'Actualizar' : 'Crear'

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {}}
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
          className='space-y-8 w-full mt-4'
          onSubmit={form.handleSubmit(() => {})}
        >
          <div className='grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1 items-start'>
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
                      {orderStates.map((state) => (
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
              name='payMethod'
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
                      disabled={isLoading}
                      type='number'
                      placeholder='154.99'
                      {...field}
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
                      value={total}
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
                      disabled={isLoading}
                      type='number'
                      placeholder='139.99'
                      {...field}
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

          <Button disabled={isLoading} type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
