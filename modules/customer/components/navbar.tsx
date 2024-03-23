import { CustomerMobileNavbar } from '@/modules/customer/components/mobile-navbar'
import Link from 'next/link'

export const CustomerNavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center border-b min-h-[3.5rem] max-lg:justify-between'>
      <Link
        href='/'
        className='text-base font-extrabold transition-colors hover:text-primary text-muted-foreground text-center pr-4 pl-6 max-w-[210px] w-full'
      >
        D&L American Outlet
      </Link>

      <div className='max-lg:hidden w-full'>{children}</div>
      <CustomerMobileNavbar>{children}</CustomerMobileNavbar>
    </div>
  )
}
