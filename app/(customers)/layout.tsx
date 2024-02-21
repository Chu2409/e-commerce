import { MainNav } from '@/components/main-nav'
import { NavBar } from '@/components/navbar'
import { customerRoutes } from '@/modules/customers/consts/customers-routes'

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar>
        <MainNav routes={customerRoutes} />
      </NavBar>
      {children}
    </>
  )
}

export default CustomerLayout
