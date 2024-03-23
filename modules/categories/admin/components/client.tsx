import { Category } from '@prisma/client'
import { categoriesColumns } from './columns'

import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'

export const CategoriesClient = ({
  categories,
}: {
  categories: Category[]
}) => {
  return (
    <>
      <Header
        title='Categorías'
        description='Administra tus categorías'
        buttonLabel='Nueva categoría'
      />

      <DataTable
        columns={categoriesColumns}
        data={categories}
        keySearch='name'
      />
    </>
  )
}
