import { customersColumns } from './columns'
import { Customer } from '@prisma/client'

import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'

export const CustomersClient = ({ customers }: { customers: Customer[] }) => {
  return (
    <>
      <Header
        title='Clientes'
        description='Administra tus clientes'
        buttonLabel='Nuevo cliente'
      />

      <DataTable columns={customersColumns} data={customers} keySearch='dni' />
    </>
  )
}
