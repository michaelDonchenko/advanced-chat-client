import create from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface ModalContext {
  isModalOpen: boolean
  currentModal: keyof ModalsMap | null
  openModal: (modalId: keyof ModalsMap) => void
  closeModal: () => void
}

export interface ModalsMap {
  '1': JSX.Element
  '2': JSX.Element
}

const useModalContext = create<ModalContext>()(
  devtools(
    immer((set) => ({
      isModalOpen: false,
      currentModal: null,
      openModal: (modalId) =>
        set((state) => {
          state.isModalOpen = true
          state.currentModal = modalId
        }),
      closeModal: () =>
        set((state) => {
          state.isModalOpen = false
          state.currentModal = null
        }),
    })),
    {name: 'modalContext'}
  )
)

export default useModalContext
