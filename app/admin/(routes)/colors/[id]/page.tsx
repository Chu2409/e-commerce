import { ColorForm } from '@/modules/colors/admin/components/form'

import { getColor } from '@/modules/colors/shared/actions/get-color'
import { Container } from '@/modules/shared/components/container'

const ColorPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const color = await getColor(params.id)

  return (
    <Container>
      <ColorForm initialData={color} />
    </Container>
  )
}

export default ColorPage
