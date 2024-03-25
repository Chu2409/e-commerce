import { categoriesColumns } from './columns'

import { Header } from '@/modules/admin/components/header'
import { DataTable } from '@/modules/admin/components/data-table'
import { IFullCategory } from '../../shared/interfaces/categories'

export const CategoriesClient = ({
  categories,
}: {
  categories: IFullCategory[]
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
