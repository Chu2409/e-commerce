import { Category, Size, SizeCategory } from '@prisma/client'

export interface IFullSize extends SizeCategory {
  size: Size
  category: Category
}
