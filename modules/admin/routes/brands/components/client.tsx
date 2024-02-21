import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { brandsColumns } from './columns'
import { getBrands } from '../data/get-brands'
import { DataTable } from '@/modules/admin/components/data-table'

export const BrandsClient = async () => {
  const brands = await getBrands()

  return (
    <div>
      <Header
        title='Marcas'
        description='Administra tus marcas'
        buttonLabel='Nueva Marca'
      />

      <Separator className='my-4' />

      <DataTable
        columns={brandsColumns}
        data={brands}
        search
        keySearch='name'
      />
    </div>
  )
}
