import { ThemeToggle } from './theme-toggle'
import { MobileNavbar } from '@/components/mobile-navbar'

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-14'>
      <div className='hidden lg:block border-b '>
        <div className='flex h-14 px-4'>
          {children}

          <div className='flex items-center space-x-4 ml-auto'>
            <ThemeToggle />
            {/* <UserButton afterSignOutUrl='/' /> */}
          </div>
        </div>
      </div>

      <div className='block lg:hidden'>
        <MobileNavbar>{children}</MobileNavbar>
      </div>
    </div>
  )
}
