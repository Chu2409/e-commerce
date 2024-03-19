import { MobileNavbar } from '@/modules/shared/components/mobile-navbar'

export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-14'>
      <div className='hidden lg:block border-b'>{children}</div>

      <div className='block lg:hidden border-b h-14'>
        <MobileNavbar>{children}</MobileNavbar>
      </div>
    </div>
  )
}
