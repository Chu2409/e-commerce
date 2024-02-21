import { MainNav } from '@/components/main-nav'
import { NavBar } from '@/components/navbar'
import { adminRoutes } from '@/modules/admin/consts/admin-routes'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar>
        <MainNav routes={adminRoutes} />
      </NavBar>
      {children}
    </>
  )
}

export default AdminLayout
