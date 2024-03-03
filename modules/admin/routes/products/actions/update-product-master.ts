import prismadb from '@/lib/prismadb'
import { ProductMaster } from '@prisma/client'

export const updateProductMaster = async (
  id: string,
  data: Omit<ProductMaster, 'id' | 'created_at' | 'updated_at'>,
) => {
  try {
    const productMaster = await prismadb.productMaster.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })

    return productMaster
  } catch (error) {
    console.log('[PRODUCT_MASTER_UPDATE]', error)
    return null
  }
}
