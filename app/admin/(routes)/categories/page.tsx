import { CategoriesClient } from '@/modules/admin/routes/categories/components/client'

const CategoriesPage = () => {
  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <CategoriesClient />
      </div>
    </div>
  )
}

export default CategoriesPage
