import { Category, Size, SizeByCategory } from '@prisma/client'

export interface IFullSize extends SizeByCategory {
  size: Size
  category: Category
}
