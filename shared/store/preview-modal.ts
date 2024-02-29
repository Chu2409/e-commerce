import { IFullProduct } from '@/modules/admin/routes/products/interfaces/full-product'
import { create } from 'zustand'

interface PreviewModalStore {
  isOpen: boolean
  data?: IFullProduct
  onOpen: (data: IFullProduct) => void
  onClose: () => void
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: IFullProduct) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined }),
}))

export default usePreviewModal
