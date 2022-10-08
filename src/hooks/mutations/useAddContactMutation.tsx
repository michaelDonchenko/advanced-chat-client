import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {createContact} from '@/api/userApi'
import useModalContext from '@/context/modalContext'
import errorHandler from '@/utils/errorHandler'
import useContactsContext from '@/context/contactsContext'

const useAddContactMutation = () => {
  const {closeModal} = useModalContext()
  const {addContact} = useContactsContext()
  const [error, setError] = useState('')

  const mutation = useMutation((username: string) => createContact(username), {
    onSuccess: (response) => {
      addContact(response.contact)
      closeModal()
    },
    onError: (error) => {
      setError(errorHandler(error))
    },
  })

  return {mutation, error}
}

export default useAddContactMutation
