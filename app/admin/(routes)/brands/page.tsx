import { BrandsClient } from '@/modules/brands/admin/components/client'

import { getBrands } from '@/modules/brands/shared/actions/get-brands'
import { Container } from '@/modules/shared/components/container'

export const revalidate = 0

const BrandsPage = async () => {
  const brands = await getBrands()

  return (
    <Container>
      <BrandsClient brands={brands} />
    </Container>
  )
}

export default BrandsPage
