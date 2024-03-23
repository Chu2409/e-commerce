import { ColorsClient } from '@/modules/colors/admin/components/client'

import { getColors } from '@/modules/colors/shared/actions/get-colors'
import { Container } from '@/modules/shared/components/container'

export const revalidate = 0

const ColorsPage = async () => {
  const colors = await getColors()

  return (
    <Container>
      <ColorsClient colors={colors} />
    </Container>
  )
}

export default ColorsPage
