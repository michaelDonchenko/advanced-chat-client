import useSocketContext from '@/context/socketContext'
import {Contact} from '@/interfaces/user-interfaces'
import {useAppDispatch, useAppSelector} from '@/store/hooks'
import {addContact, fetchContacts} from '@/store/reducers/contactsSlice'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import ContactComponent from './contact'

const Contacts: React.FC = () => {
  const contacts = useAppSelector((state) => state.contacts.contacts)
  const dispatch = useAppDispatch()
  const {socket} = useSocketContext()

  useEffect(() => {
    dispatch(fetchContacts())
  }, [])

  useEffect(() => {
    socket.on('newContact', (contact: Contact) => dispatch(addContact({contact})))
  }, [])

  return (
    <Container>
      {contacts?.map((contact) => (
        <ContactComponent key={contact.id} contact={contact} />
      ))}
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
