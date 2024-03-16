import {
  Brand,
  Category,
  Color,
  Product,
  ProductColor,
  ProductMaster,
} from '@prisma/client'
import { IFullSize } from '../../sizes/interfaces/size'

export interface IFullProduct extends Product {
  sizeCategory: Omit<IFullSize, 'category'>
}

export interface IFullProductColor extends ProductColor {
  color: Color
  images: Image[]
  products: IFullProduct[]
}

export interface IFullProductMaster extends ProductMaster {
  brand: Brand
  category: Category
  productsColors: IFullProductColor[]
}
