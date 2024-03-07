import {
  Brand,
  Color,
  Customer,
  Item,
  Order,
  Product,
  ProductColor,
  ProductMaster,
} from '@prisma/client'
import { IFullSize } from '../../sizes/interfaces/size'

interface IFullProductMasterOrder extends ProductMaster {
  brand: Brand
}

interface IFullProductColorOrder extends ProductColor {
  color: Color
  images: Image[]
  productMaster: IFullProductMasterOrder
}

export interface IFullProductOrder extends Product {
  sizeCategory: IFullSize
  productColor: IFullProductColorOrder
}

interface IFullItem extends Item {
  product: IFullProductOrder
}
export interface IFullOrder extends Order {
  customer: Customer
  items: IFullItem[]
}
