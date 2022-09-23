import {createSlice} from '@reduxjs/toolkit'
import {io, Socket} from 'socket.io-client'

export interface SocketSlice {
  socketIo: Socket
}

const initialState: SocketSlice = {
  socketIo: io('http://localhost:8000', {withCredentials: true}),
}

const socketSlice = createSlice({
  name: 'socket',
  initialState: initialState,
  reducers: {},
})

export default socketSlice.reducer
