import { IFullSize } from '@/modules/sizes/shared/interfaces/size'
import {
  Brand,
  Category,
  Color,
  Product,
  ProductColor,
  ProductMaster,
} from '@prisma/client'

export interface IFullProduct extends Product {
  sizeCategory: Omit<IFullSize, 'category'> | null
}

export interface IFullProductColor extends ProductColor {
  color: Color | null
  images: Image[]
  products: IFullProduct[]
}

export interface IFullProductMaster extends ProductMaster {
  brand: Brand
  category: Category
  productsColors: IFullProductColor[]
}
