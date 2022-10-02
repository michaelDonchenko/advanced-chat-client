import {useAppDispatch, useAppSelector} from '@/store/hooks'
import {fetchConversation, resetConversation} from '@/store/reducers/conversationSlice'
import {useEffect} from 'react'
import styled from 'styled-components'
import Message from './message'

const Messages = () => {
  const {conversation, chosenConversationId} = useAppSelector((state) => state.conversation)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (chosenConversationId) {
      dispatch(fetchConversation(chosenConversationId))
      return
    }
    dispatch(resetConversation())
  }, [chosenConversationId])

  return (
    <Container>
      {conversation?.messages?.map((message) => (
        <Message message={message} key={message.id} />
      ))}
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
