import { getColor } from '@/modules/admin/routes/colors/actions/get-color'
import { ColorForm } from '@/modules/admin/routes/colors/components/form'

const ColorPage = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const color = await getColor(params.id)

  return (
    <div className='flex flex-col'>
      <div className='p-8 pt-6 flex flex-col flex-1'>
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorPage
