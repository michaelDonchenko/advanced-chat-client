import React, {useCallback} from 'react'
import styled from 'styled-components'
import {IoSendSharp} from 'react-icons/io5'
import MessageInput from '@/components/inputs/message-input'
import Messages from '@/components/messages'
import SideBar from '@/components/side-bar'
import Modal from '@/components/modals'
import AddContactModal from '@/components/modals/add-contact-modal'
import useAuthContext from '@/context/authContext'
import useSocketContext from '@/context/socketContext'
import useModalContext from '@/context/modalContext'
import useConversationContext from '@/context/conversationContext'
import {useQuery} from '@tanstack/react-query'
import {getConversation} from '@/api/user-api'

const App: React.FC = () => {
  const {user} = useAuthContext()
  const {socket} = useSocketContext()
  const {isModalOpen, closeModal} = useModalContext()
  const {activeConversationId, setConversation, conversation} = useConversationContext()

  const {} = useQuery(['conversation', activeConversationId], () => getConversation(activeConversationId), {
    enabled: typeof activeConversationId === 'number',
    onSuccess: (data) => {
      setConversation(data.conversation)
    },
  })

  const onModalClose = useCallback(() => closeModal(), [])

  const onNewMessage = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, ref: React.MutableRefObject<null | HTMLInputElement>) => {
      if (ref.current?.value && event.key === 'Enter') {
        if (!conversation) {
          return
        }

        const newMessage = {
          text: ref.current.value,
          from: user?.id,
          conversationId: activeConversationId,
        }

        socket.emit('message', {message: newMessage, conversation: conversation, myUserId: user?.id})
        ref.current.value = ''
      }
    },
    [activeConversationId, user?.id, conversation]
  )

  return (
    <>
      <Container>
        <SidebarWrapper>
          <SideBar />
        </SidebarWrapper>

        <MessagesWrapper>
          {!activeConversationId && <StyledH2>Please choose or create contact</StyledH2>}

          {conversation && (
            <>
              <Messages messages={conversation.messages} />
              <InputContainer>
                <MessageInput onSubmit={onNewMessage} />
                <StyledIcon />
              </InputContainer>
            </>
          )}
        </MessagesWrapper>
      </Container>
      {isModalOpen && <Modal onModalClose={onModalClose} Content={<AddContactModal />} />}
    </>
  )
}

const Container = styled.main`
  width: 100%;
  height: 95%;
  max-width: 1280px;
  background-color: ${({theme}) => theme.palette.background.dark};
  border-radius: 4px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`

const SidebarWrapper = styled.div`
  width: 30%;
  @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
    width: 50%;
  }
`

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
    width: 50%;
  }
`
const InputContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
`

const StyledIcon = styled(IoSendSharp)`
  fill: ${({theme}) => theme.palette.primary.light};
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
`

const StyledH2 = styled.h2`
  margin-top: 16px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`

export default App
