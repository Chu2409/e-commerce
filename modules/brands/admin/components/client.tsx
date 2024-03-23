import { Brand } from '@prisma/client'

import { brandsColumns } from './columns'
import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'

export const BrandsClient = ({ brands }: { brands: Brand[] }) => {
  return (
    <>
      <Header
        title='Marcas'
        description='Administra tus marcas'
        buttonLabel='Nueva Marca'
      />

      <DataTable columns={brandsColumns} data={brands} keySearch='name' />
    </>
  )
}
