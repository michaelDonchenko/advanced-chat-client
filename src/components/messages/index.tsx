import useSocketContext from '@/context/socketContext'
import useOnScreen from '@/hooks/useOnScreen'
import {Message as MessageI} from '@/interfaces/user-interfaces'
import {useAppDispatch, useAppSelector} from '@/store/hooks'
import {fetchConversation, pushMessage, resetConversation} from '@/store/reducers/conversationSlice'
import {useEffect, useRef} from 'react'
import styled from 'styled-components'
import Message from './message'

const Messages = () => {
  const {socket} = useSocketContext()

  const {conversation, chosenConversationId} = useAppSelector((state) => state.conversation)
  const dispatch = useAppDispatch()
  const bottomRef = useRef<HTMLDivElement>(null)
  const isVisible = useOnScreen(bottomRef)

  useEffect(() => {
    if (chosenConversationId) {
      dispatch(fetchConversation(chosenConversationId))
    }

    return () => {
      dispatch(resetConversation())
    }
  }, [chosenConversationId])

  useEffect(() => {
    socket.on('newMessage', (message: MessageI) => {
      console.log(chosenConversationId)
      if (message.conversationId === chosenConversationId) {
        dispatch(pushMessage(message))
      }
    })
  }, [chosenConversationId])

  useEffect(() => {
    socket.on('selfMessage', (message: MessageI) => {
      dispatch(pushMessage(message))
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [isVisible, chosenConversationId])

  return (
    <Container>
      {conversation?.messages?.map((message) => (
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
