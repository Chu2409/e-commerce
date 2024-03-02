import {
  Brand,
  Category,
  Color,
  Image,
  Product,
  ProductMaster,
} from '@prisma/client'
import { IFullSize } from '../../sizes/interfaces/full-size'

interface IFullProduct extends Product {
  color: Color
  size: Omit<IFullSize, 'category'>
  images: Image[]
}
export interface IFullProductMaster extends ProductMaster {
  brand: Brand
  category: Category
  products: IFullProduct[]
}
