'use server'

import prismadb from '@/lib/prismadb'
import { IFullProductMaster } from '../interfaces/product'
import { PRODUCT_STATE } from '@prisma/client'

export const getMasterByProduct = async (
  id: string,
  onlyAvailable?: boolean,
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

    if (!product) return null

    if (onlyAvailable) {
      const productMaster = await prismadb.productMaster.findUnique({
        where: {
          id: product.productColor.productMasterId,
          productsColors: {
            some: {
              products: {
                some: {
                  state: {
                    not: PRODUCT_STATE.NO_DISPONIBLE,
                  },
                },
              },
            },
          },
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
                where: {
                  state: {
                    not: PRODUCT_STATE.NO_DISPONIBLE,
                  },
                },
              },
            },
            where: {
              products: {
                some: {
                  state: {
                    not: PRODUCT_STATE.NO_DISPONIBLE,
                  },
                },
              },
            },
          },
        },
      })

      return productMaster
    } else {
      const productMaster = await prismadb.productMaster.findUnique({
        where: {
          id: product.productColor.productMasterId,
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
    }
  } catch (error: any) {
    console.log('[GET_MASTER_BY_PRODUCT]', error.message)
    return null
  }
}
