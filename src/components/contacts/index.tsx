import {getContacts} from '@/api/user-api'
import useAuthContext from '@/context/authContext'
import useContactsContext from '@/context/contactsContext'
import useSocketContext from '@/context/socketContext'
import useQueryParams from '@/hooks/useQueryParams'
import {Contact} from '@/interfaces/user-interfaces'
import {useQuery} from '@tanstack/react-query'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import ContactComponent from './contact'

const Contacts: React.FC = () => {
  const {isLoading} = useQuery(['contacts'], getContacts, {
    onSuccess: (data) => {
      setContacts(data.contacts)
    },
  })
  const {contacts, setContacts, addContact, updateContactValues} = useContactsContext()
  const queryParams = useQueryParams()
  const conversationId = Number(queryParams.get('conversation_id'))
  const {user} = useAuthContext()

  const {socket} = useSocketContext()

  useEffect(() => {
    socket.on('newContact', (contact: Contact) => addContact(contact))
    socket.on('updateContactValues', (contact: Contact) => updateContactValues(contact))
    socket.on('updateMyContact', (contact: Contact) => updateContactValues(contact))
    socket.emit('conversationChange', {conversationId, myUserId: user?.id})

    return () => {
      socket.off()
    }
  }, [conversationId])

  return (
    <Container>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {contacts?.map((contact) => (
            <ContactComponent key={contact.id} contact={contact} />
          ))}
        </>
      )}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({theme}) => theme.palette.background.light};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.palette.gray.main};
    border-radius: 10px;
  }
`

export default Contacts
