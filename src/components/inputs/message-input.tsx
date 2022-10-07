import useAuthContext from '@/context/authContext'
import useConversationContext from '@/context/conversationContext'
import useSocketContext from '@/context/socketContext'
import useQueryParams from '@/hooks/useQueryParams'
import React, {useRef, useCallback} from 'react'
import styled from 'styled-components'

const MessageInput: React.FC = () => {
  const {user} = useAuthContext()
  const {socket} = useSocketContext()
  const queryParams = useQueryParams()
  const {conversation} = useConversationContext()
  const conversationId = Number(queryParams.get('conversation_id'))

  const onSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, ref: React.MutableRefObject<null | HTMLInputElement>) => {
      if (ref.current?.value && event.key === 'Enter') {
        if (!conversation) {
          return
        }

        const newMessage = {
          text: ref.current.value,
          from: user?.id,
          conversationId: conversationId,
          createdAt: new Date(),
        }

        socket.emit('message', {message: newMessage, conversation: conversation, myUserId: user?.id})
        ref.current.value = ''
        return
      }
    },
    [conversationId, conversation]
  )

  const ref = useRef(null)
  return <Input onKeyDown={(event) => onSubmit(event, ref)} ref={ref} placeholder='Write a message...' />
}

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  outline: none;
  padding: 6px;
  font-size: 18px;
  background-color: ${({theme}) => theme.palette.background.dark};
  border: 2px solid ${({theme}) => theme.palette.gray.main};
  border-radius: 4px;
`

export default MessageInput
