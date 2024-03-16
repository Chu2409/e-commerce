import { Category } from '@prisma/client'
import { categoriesColumns } from './columns'

import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'
import { Separator } from '@/components/ui/separator'

export const CategoriesClient = ({
  categories,
}: {
  categories: Category[]
}) => {
  return (
    <div>
      <Header
        title='Categorías'
        description='Administra tus categorías'
        buttonLabel='Nueva'
      />

      <Separator className='my-4' />

      <DataTable
        columns={categoriesColumns}
        data={categories}
        keySearch='name'
      />
    </div>
  )
}
