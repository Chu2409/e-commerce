import { CustomerMainNav } from '@/modules/customer/components/main-nav'
import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { CustomerNavBar } from '@/modules/customer/components/navbar'

export const revalidate = 0

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategories()

  const formattedCategories = categories.map((category) => ({
    label: category.name,
    href: `/category/${category.id}`,
  }))

  return (
    <>
      <CustomerNavBar>
        <CustomerMainNav routes={formattedCategories} />
      </CustomerNavBar>
      {children}
    </>
  )
}

export default CustomerLayout
