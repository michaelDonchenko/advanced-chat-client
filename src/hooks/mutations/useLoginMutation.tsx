import {login} from '@/api/authApi'
import useAuthContext from '@/context/authContext'
import useSocketContext from '@/context/socketContext'
import errorHandler from '@/utils/errorHandler'
import {setLocalStorage} from '@/utils/localStorage'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'

export interface FormValues {
  username: string
  password: string
}

const useLoginMutation = () => {
  const [error, setError] = useState('')
  const {socket} = useSocketContext()
  const authContext = useAuthContext()

  const mutation = useMutation((values: FormValues) => login(values), {
    onSuccess: (response) => {
      setLocalStorage('user', response.user)
      setLocalStorage('jwt', response.jwt)
      setLocalStorage('isAuthenticated', true)
      authContext.login(response)

      socket.emit('login', response.user.id)
    },
    onError: (error) => {
      setError(errorHandler(error))
    },
  })

  return {mutation, error}
}

export default useLoginMutation
