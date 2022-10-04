import create from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface ModalContext {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useModalContext = create<ModalContext>()(
  devtools(
    immer((set) => ({
      isModalOpen: false,
      openModal: () =>
        set((state) => {
          state.isModalOpen = true
        }),
      closeModal: () =>
        set((state) => {
          state.isModalOpen = false
        }),
    })),
    {name: 'modalContext'}
  )
)

export default useModalContext
