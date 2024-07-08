import { IFullSize } from '@/modules/sizes/shared/interfaces/size'
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

interface IFullProductMasterOrder extends ProductMaster {
  brand: Brand
}

interface IFullProductColorOrder extends ProductColor {
  color: Color | null
  images: Image[]
  productMaster: IFullProductMasterOrder
}

export interface IFullProductOrder extends Product {
  sizeCategory: IFullSize | null
  productColor: IFullProductColorOrder
}

interface IFullItemOrder extends Item {
  product: IFullProductOrder
}
export interface IFullOrder extends Order {
  customer: Customer
  items: IFullItemOrder[]
}
