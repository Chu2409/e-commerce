import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'
import { customersColumns } from './columns'
import { Customer } from '@prisma/client'

export const CustomersClient = ({ customers }: { customers: Customer[] }) => {
  return (
    <div>
      <Header
        title='Clientes'
        description='Administra tus clientes'
        buttonLabel='Nuevo cliente'
      />

      <Separator className='my-4' />

      <DataTable columns={customersColumns} data={customers} keySearch='dni' />
    </div>
  )
}
