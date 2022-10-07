import {Contact} from '@/interfaces/user-interfaces'
import React, {useCallback} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import useQueryParams from '@/hooks/useQueryParams'

const ContactComponent: React.FC<{contact: Contact}> = React.memo((props) => {
  const {photo, username, conversationId} = props.contact
  const queryParams = useQueryParams()
  const navigate = useNavigate()

  const activeConversationId = Number(queryParams.get('conversation_id'))
  const isActiveChat = conversationId === activeConversationId

  const onClick = useCallback(() => navigate(`/?conversation_id=${conversationId}`), [conversationId])

  return (
    <Container isActiveChat={isActiveChat}>
      <Avatar onClick={onClick} alt='Avatar image' src={photo} />
      <NameSection onClick={onClick}>
        <p>{username}</p>
        <LastMessage>Last message</LastMessage>
      </NameSection>

      <InfoSection>
        <p>08:12</p>
        <UnreadMessages>4</UnreadMessages>
      </InfoSection>
    </Container>
  )
})

const Container = styled.div<{isActiveChat: boolean}>`
  display: flex;
  width: 100%;
  padding: 10px 8px;
  transition: all 0.2s;
  background-color: ${({theme, isActiveChat}) => (isActiveChat ? theme.palette.background.light : null)};

  &:hover {
    background-color: ${({theme}) => theme.palette.background.light};
  }
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px 8px;
  flex: 1;
  cursor: pointer;
`
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`

const LastMessage = styled.p`
  color: ${({theme}) => theme.palette.gray.main};
`

const UnreadMessages = styled.div`
  margin-top: 4px;
  padding: 0 4px;
  border-radius: 15px;
  background-color: ${({theme}) => theme.palette.primary.dark};
`

export default ContactComponent
