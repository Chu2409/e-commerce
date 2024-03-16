import { PRODUCT_STATE } from '@prisma/client'

export interface IProductsFilters {
  name?: string
  state?: PRODUCT_STATE
  brandId?: string
  categoryId?: string
  sizeId?: string
  colorId?: string
  take: number
  skip: number
}
