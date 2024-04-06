import { adminRoutes } from '@/modules/admin/consts/admin-routes'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { AdminMainNav } from '@/modules/admin/components/main-nav'
import { authOptions } from '@/modules/auth/consts/auth-options'
import { AdminNavBar } from '@/modules/admin/components/navbar'

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth/login')
  if (session.user?.role !== 'admin') redirect('/')

  return (
    <>
      <AdminNavBar>
        <AdminMainNav routes={adminRoutes} />
      </AdminNavBar>
      {children}
    </>
  )
}

export default AdminLayout
