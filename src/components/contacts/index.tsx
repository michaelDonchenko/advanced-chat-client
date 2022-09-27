import {Chat} from '@/interfaces/chat-interfaces'
import React from 'react'
import styled from 'styled-components'
import Contact from './contact'

const Contacts: React.FC<{contacts: Chat[]}> = ({contacts}) => {
  return (
    <Container>
      {contacts.map((contact) => (
        <Contact key={contact.id} />
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
