import { type ClassValue, clsx } from 'clsx'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatDateHours = (date: Date) => {
  return format(date, 'MMM dd, yyyy - kk:mm', { locale: es })
}

export const formatDate = (date: Date) => {
  return format(date, 'MMM dd, yyyy', { locale: es })
}
