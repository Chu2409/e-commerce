import { BrandForm } from '@/modules/brands/admin/components/form'

import { getBrand } from '@/modules/brands/shared/actions/get-brand'
import { Container } from '@/modules/shared/components/container'

const BrandPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const brand = await getBrand(params.id)

  return (
    <Container>
      <BrandForm initialData={brand} />
    </Container>
  )
}

export default BrandPage
