import useConversationContext from '@/context/conversationContext'
import useSocketContext from '@/context/socketContext'
import useQueryParams from '@/hooks/useQueryParams'
import {Message} from '@/interfaces'
import React, {useEffect} from 'react'

const MessagesSideEffects = React.memo(() => {
  const {socket} = useSocketContext()
  const {addMessage} = useConversationContext()
  const queryParams = useQueryParams()
  const conversationId = Number(queryParams.get('conversation_id'))

  useEffect(() => {
    socket.on('newMessage', (message: Message) => {
      if (message.conversationId === conversationId) {
        addMessage(message)
      }
    })

    socket.on('selfMessage', (message: Message) => {
      if (message.conversationId === conversationId) {
        addMessage(message)
      }
    })

    return () => {
      socket.off()
    }
  }, [conversationId])

  return <></>
})

export default MessagesSideEffects
