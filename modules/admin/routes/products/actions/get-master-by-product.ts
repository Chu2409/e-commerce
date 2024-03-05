'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductMaster } from '../interfaces/product'

export const getMasterByProduct = async (
  id: string,
): Promise<IFullProductMaster | null> => {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id,
      },
      include: {
        productColor: true,
      },
    })

    const productMaster = await prismadb.productMaster.findUnique({
      where: {
        id: product?.productColor.productMasterId,
      },
      include: {
        brand: true,
        category: true,
        productsColors: {
          include: {
            color: true,
            images: true,
            products: {
              include: {
                sizeCategory: {
                  include: {
                    size: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return productMaster
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return null
  }
}
