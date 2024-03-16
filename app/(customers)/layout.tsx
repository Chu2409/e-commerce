import { MainNav } from '@/modules/admin/components/main-nav'
import { NavBar } from '@/components/navbar'

export const revalidate = 0

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar>
        <MainNav routes={[]} />
      </NavBar>
      {children}
    </>
  )
}

export default CustomerLayout
