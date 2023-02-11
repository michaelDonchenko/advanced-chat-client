import create from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {io, Socket} from 'socket.io-client'
import {getLocalStorage} from '@/utils/localStorage'

interface SocketContext {
  socket: Socket
}

const useSocketContext = create<SocketContext>()(
  devtools(
    immer((set, get) => ({
      socket: io('http://localhost:8000', {withCredentials: true, query: {userId: getLocalStorage('user')?.id}}),
    })),
    {name: 'socketContext'}
  )
)

export default useSocketContext
