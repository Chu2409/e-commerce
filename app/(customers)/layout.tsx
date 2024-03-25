import { CustomerMainNav } from '@/modules/customer/components/main-nav'
import { CustomerNavBar } from '@/modules/customer/components/navbar'
import { getMasterWithCategories } from '@/modules/categories/shared/actions/get-master-with-categories'

export const revalidate = 0

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const categoriesMaster = await getMasterWithCategories()

  const formattedCategories = categoriesMaster.map((masterCategory) => ({
    mainLabel: masterCategory.name,
    routes: masterCategory.categories.map((category) => ({
      label: category.name,
      href: `/category/${category.id}`,
    })),
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
