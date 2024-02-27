import { Brand, Category, Color, Image, Product } from '@prisma/client'
import { IFullSize } from '../../sizes/interfaces/full-size'

export interface IFullProduct extends Product {
  brand: Brand
  category: Category
  color: Color
  size: IFullSize
  images: Image[]
}
