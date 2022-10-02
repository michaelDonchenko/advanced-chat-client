import {Conversation} from '@/interfaces/user-interfaces'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {getConversation} from '@/api/user-api'
import errorHandler from '@/utils/error-handler'

export interface ConversationSlice {
  chosenConversationId: number | null
  loading: boolean
  error: string
  conversation: Conversation | null
}

const initialState: ConversationSlice = {
  chosenConversationId: null,
  loading: false,
  error: '',
  conversation: null,
}

export const fetchConversation = createAsyncThunk(
  'conversation/getConversation',
  async (id: number) => await getConversation(id)
)

const conversationSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    chooseConversation: (state, action: PayloadAction<number>) => {
      state.chosenConversationId = action.payload
    },
    resetChosenConversation: (state) => {
      state.chosenConversationId = null
    },
    resetConversation: (state) => {
      state.conversation = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchConversation.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.conversation = action.payload.data.conversation
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        state.loading = false
        state.error = errorHandler(action.payload)
        state.conversation = null
      })
  },
})

export const {chooseConversation, resetChosenConversation, resetConversation} = conversationSlice.actions

export default conversationSlice.reducer
