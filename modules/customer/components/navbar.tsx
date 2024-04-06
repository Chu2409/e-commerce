import Link from 'next/link'
import { ICategoryRoutes } from '../interfaces/categories-routes'
import { CustomerMainNav } from './main-nav'
import { CustomerMobileNavbar } from './mobile-navbar'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/modules/auth/consts/auth-options'

export const CustomerNavBar = async ({
  routes,
}: {
  routes: ICategoryRoutes[]
}) => {
  const session = await getServerSession(authOptions)

  return (
    <div className='flex items-center border-b min-h-[3.5rem] max-lg:justify-between'>
      <Link
        href='/'
        className='text-base font-extrabold transition-colors hover:text-primary text-muted-foreground text-center pr-4 pl-6 max-w-[250px] w-full flex items-center gap-4'
      >
        <Image
          src='/icon.png'
          alt='Website Icon'
          width={24}
          height={24}
          className='w-6 h-6 align-middle hover:scale-105 transition-transform duration-200 ease-in-out'
        />
        {process.env.NEXT_PUBLIC_SITE_NAME}
      </Link>

      <CustomerMainNav routes={routes} session={session} />
      <CustomerMobileNavbar routes={routes} session={session} />
    </div>
  )
}
