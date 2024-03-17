import { MainNav } from '@/modules/shared/components/main-nav'
import { NavBar } from '@/modules/shared/components/navbar'
import { getCategories } from '@/modules/categories/shared/actions/get-categories'

export const revalidate = 0

const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategories()

  const formattedCategories = categories.map((category) => ({
    label: category.name,
    href: `/category/${category.id}`,
  }))

  return (
    <>
      <NavBar>
        <MainNav routes={formattedCategories} session={false} />
      </NavBar>
      {children}
    </>
  )
}

export default CustomerLayout
