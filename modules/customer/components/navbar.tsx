import Link from 'next/link'
import { ICategoryRoutes } from '../interfaces/categories-routes'
import { CustomerMainNav } from './main-nav'
import { CustomerMobileNavbar } from './mobile-navbar'

export const CustomerNavBar = ({ routes }: { routes: ICategoryRoutes[] }) => {
  return (
    <div className='flex items-center border-b min-h-[3.5rem] max-lg:justify-between'>
      <Link
        href='/'
        className='text-base font-extrabold transition-colors hover:text-primary text-muted-foreground text-center pr-4 pl-6 max-w-[210px] w-full'
      >
        D&L American Outlet
      </Link>

      <CustomerMainNav routes={routes} />
      <CustomerMobileNavbar routes={routes} />
    </div>
  )
}
