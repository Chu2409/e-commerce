import { ORDER_STATE, PAY_METHOD } from '@prisma/client'

export interface IOrdersFilters {
  dateFrom?: Date
  dateTo?: Date
  state?: ORDER_STATE
  payMethod?: PAY_METHOD
  customerId?: string
  take: number
  skip: number
}
