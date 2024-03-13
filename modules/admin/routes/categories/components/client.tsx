import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { categoriesColumns } from './columns'
import { DataTable } from '@/modules/admin/components/data-table'
import { Category } from '@prisma/client'

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
