import { Separator } from '@/components/ui/separator'
import { Header } from '@/modules/admin/components/header'
import { categoriesColumns } from './columns'
import { getCategories } from '../actions/get-categories'
import { DataTable } from '@/modules/admin/components/data-table'

export const CategoriesClient = async () => {
  const categories = await getCategories()

  return (
    <div>
      <Header
        title='Categorías'
        description='Administra tus categorías'
        buttonLabel='Nueva Categoría'
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
