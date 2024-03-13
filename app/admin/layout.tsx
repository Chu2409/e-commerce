import { MainNav } from '@/components/main-nav'
import { NavBar } from '@/components/navbar'
import { adminRoutes } from '@/modules/admin/consts/admin-routes'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/modules/auth/consts/auth-options'
import { redirect } from 'next/navigation'

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth/login')
  if (session.user?.image !== 'admin') redirect('/')

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
