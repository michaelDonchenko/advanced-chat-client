import {createSlice} from '@reduxjs/toolkit'

export interface ModalSlice {
  isModalOpen: boolean
}

const initialState: ModalSlice = {
  isModalOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    onModalOpen: (state, action) => {
      state.isModalOpen = true
    },
    onModalClose: (state, action) => {
      state.isModalOpen = false
    },
  },
})

export const {onModalClose, onModalOpen} = modalSlice.actions

export default modalSlice.reducer
