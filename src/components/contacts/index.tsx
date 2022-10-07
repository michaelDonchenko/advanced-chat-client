import {getContacts} from '@/api/user-api'
import useContactsContext from '@/context/contactsContext'
import useSocketContext from '@/context/socketContext'
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
  const {contacts, setContacts, addContact} = useContactsContext()
  const {socket} = useSocketContext()

  useEffect(() => {
    socket.on('newContact', (contact: Contact) => addContact(contact))
  }, [])

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
