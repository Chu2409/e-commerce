import { adminRoutes } from '@/modules/admin/consts/admin-routes'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { MainNav } from '@/modules/shared/components/main-nav'
import { authOptions } from '@/modules/auth/consts/auth-options'
import { NavBar } from '@/modules/shared/components/navbar'

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth/login')
  if (session.user?.image !== 'admin') redirect('/')

  return (
    <>
      <NavBar>
        <MainNav routes={adminRoutes} session />
      </NavBar>
      {children}
    </>
  )
}

export default AdminLayout
