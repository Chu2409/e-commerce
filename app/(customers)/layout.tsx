import { CustomerNavBar } from '@/modules/customer/components/navbar'
import { getMasterWithCategories } from '@/modules/categories/shared/actions/get-master-with-categories'

export const revalidate = 0

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
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
      <CustomerNavBar routes={routes} />
      {children}
    </>
  )
}

export default CustomerLayout
