import {Chat} from '@/interfaces/chat-interfaces'
import {createSlice} from '@reduxjs/toolkit'

export interface ChatSlice {
  chats: Chat[]
  activeChat: number | null
  loading: boolean
  error: string | null
}

const initialState: ChatSlice = {
  chats: [],
  activeChat: null,
  loading: false,
  error: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {},
  extraReducers: {},
})

export default chatSlice.reducer
