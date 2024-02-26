import { Customer, Order } from '@prisma/client'

export interface IFullOrder extends Order {
  customer: Customer
}
