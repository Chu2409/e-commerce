import Link from 'next/link'
import { AdminMobileNavbar } from './mobile-navbar'

export const AdminNavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center border-b min-h-[3.5rem] max-lg:justify-between'>
      <Link
        href='/'
        className='text-base font-extrabold transition-colors hover:text-primary text-muted-foreground text-center px-6 max-w-[220px] w-full'
      >
        D&L American Outlet
      </Link>

      <div className='max-lg:hidden w-full'>{children}</div>
      <AdminMobileNavbar>{children}</AdminMobileNavbar>
    </div>
  )
}
