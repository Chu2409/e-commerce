import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

export const Profile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='rounded-full overflow-hidden cursor-pointer border border-black'>
          <Image
            src='/icon.png'
            alt='Profile'
            width={20}
            height={20}
            className='w-8 h-8'
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-[100px]'>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            Órdenes
          </DropdownMenuItem>

          <DropdownMenuItem className='cursor-pointer'>
            Configuración
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className='cursor-pointer'>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
