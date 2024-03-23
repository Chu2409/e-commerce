import { Color } from '@prisma/client'
import { colorsColumns } from './columns'

import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'

export const ColorsClient = ({ colors }: { colors: Color[] }) => {
  return (
    <>
      <Header
        title='Colores'
        description='Administra tus colores'
        buttonLabel='Nuevo color'
      />

      <DataTable columns={colorsColumns} data={colors} keySearch='name' />
    </>
  )
}
