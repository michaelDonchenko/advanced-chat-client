import {RootState} from '@/store'
import {useSelector} from 'react-redux'

const useSocket = () => useSelector((state: RootState) => state.socket.socketIo)

export default useSocket
