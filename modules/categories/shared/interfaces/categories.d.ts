import { Category } from '@prisma/client'

export interface IFullCategory extends Category {
  masterCategory: Category | null
}

export interface IMasterCategoryWithCategories extends Category {
  categories: Category[]
}
