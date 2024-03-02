import { Customer, Order } from '@prisma/client'

export interface IOrderWithCustomer extends Order {
  customer: Customer
}
