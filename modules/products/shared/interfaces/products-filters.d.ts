import { PRODUCT_GENDER, PRODUCT_STATE } from '@prisma/client'

export interface IProductsFilters {
  name?: string
  state?: PRODUCT_STATE
  gender?: PRODUCT_GENDER
  brandId?: string
  categoryId?: string
  sizeId?: string
  colorId?: string
  take: number
  skip: number
}
