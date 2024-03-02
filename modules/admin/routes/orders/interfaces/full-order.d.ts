import { Customer, Item, Order } from '@prisma/client'
import { IFullProduct } from '../../products/interfaces/full-product'

interface IFullItem extends Item {
  product: IFullProduct
}
export interface IFullOrder extends Order {
  customer: Customer
  items: IFullItem[]
}
