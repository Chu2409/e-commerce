import Link from 'next/link'
import { AdminMobileNavbar } from './mobile-navbar'
import Image from 'next/image'

export const AdminNavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center border-b min-h-[3.5rem] max-lg:justify-between'>
      <Link
        href='/'
        className='text-base font-extrabold transition-colors hover:text-primary text-muted-foreground text-center px-6 max-w-[260px] w-full flex items-center gap-4'
      >
        <Image
          src='/icon.png'
          alt='Website Icon'
          width={24}
          height={24}
          className='w-6 h-6 align-middle hover:scale-105 transition-transform duration-200 ease-in-out'
        />
        D&L American Outlet
      </Link>

      <div className='max-lg:hidden w-full'>{children}</div>
      <AdminMobileNavbar>{children}</AdminMobileNavbar>
    </div>
  )
}
