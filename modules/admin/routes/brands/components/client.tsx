import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { brandsColumns } from './columns'
import { DataTable } from '@/modules/admin/components/data-table'
import { Brand } from '@prisma/client'

export const BrandsClient = ({ brands }: { brands: Brand[] }) => {
  return (
    <div>
      <Header
        title='Marcas'
        description='Administra tus marcas'
        buttonLabel='Nueva'
      />

      <Separator className='my-4' />

      <DataTable columns={brandsColumns} data={brands} keySearch='name' />
    </div>
  )
}
