import { CustomerNavBar } from '@/modules/customer/components/navbar'
import { getMasterWithCategories } from '@/modules/categories/shared/actions/get-master-with-categories'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/modules/auth/consts/auth-options'
import { getFormattedProductsInCart } from '@/modules/auth/actions/get-formatted-products-in-cart'
import { CartLoad } from '@/modules/cart/components/cart-load'
import { IProductCart } from '@/modules/cart/store/cart'

export const revalidate = 0

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)
  let productsInCart: IProductCart[] = []

  if (session && session.user.role === 'customer') {
    productsInCart = await getFormattedProductsInCart(session.user.id)
  }

  const categoriesMaster = await getMasterWithCategories()

  const routes = categoriesMaster.map((masterCategory) => ({
    mainLabel: masterCategory.name,
    routes: masterCategory.categories.map((category) => ({
      label: category.name,
      href: `/category/${category.id}`,
    })),
  }))

  return (
    <>
      <CartLoad productsInCart={productsInCart} />
      <CustomerNavBar routes={routes} />
      {children}
    </>
  )
}

export default CustomerLayout
