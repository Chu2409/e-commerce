import { getCategories } from '@/modules/categories/shared/actions/get-categories'
import { redirect } from 'next/navigation'

const CustomersPage = async () => {
  const categories = await getCategories()

  redirect(`/category/${categories[0].id}`)
}

export default CustomersPage
