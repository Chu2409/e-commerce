import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'
import { getColors } from '../actions/get-colors'
import { colorsColumns } from './columns'

export const ColorsClient = async () => {
  const colors = await getColors()

  return (
    <div>
      <Header
        title='Colores'
        description='Administra tus colores'
        buttonLabel='Nueva Color'
      />

      <Separator className='my-4' />

      <DataTable columns={colorsColumns} data={colors} keySearch='name' />
    </div>
  )
}
