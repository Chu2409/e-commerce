import { Customer, Item, Order } from '@prisma/client'
import { IFullProductWithMaster } from '../../products/interfaces/product'

interface IFullItem extends Item {
  product: IFullProductWithMaster
}
export interface IFullOrder extends Order {
  customer: Customer
  items: IFullItem[]
}
