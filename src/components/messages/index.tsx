import useConversationContext from '@/context/conversationContext'
import useSocketContext from '@/context/socketContext'
import useOnScreen from '@/hooks/useOnScreen'
import useQueryParams from '@/hooks/useQueryParams'
import {Message as MessageI} from '@/interfaces/user-interfaces'
import {useEffect, useRef} from 'react'
import styled from 'styled-components'
import Message from './message'

interface MessagesProps {
  messages: MessageI[]
}

const Messages: React.FC<MessagesProps> = ({messages}) => {
  const {socket} = useSocketContext()
  const {addMessage} = useConversationContext()
  const queryParams = useQueryParams()
  const activeConversationId = queryParams.get('conversation_id')

  const bottomRef = useRef<HTMLDivElement>(null)
  const isVisible = useOnScreen(bottomRef)

  useEffect(() => {
    socket.on('newMessage', (message: MessageI) => {
      if (message.conversationId === (activeConversationId && +activeConversationId)) {
        addMessage(message)
      }
    })

    socket.on('selfMessage', (message: MessageI) => {
      if (message.conversationId === (activeConversationId && +activeConversationId)) {
        addMessage(message)
      }
    })
  }, [activeConversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [isVisible, activeConversationId])

  return (
    <Container>
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
      <div ref={bottomRef}></div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

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

export default Messages
