import React, {useCallback} from 'react'
import styled from 'styled-components'
import {IoSendSharp} from 'react-icons/io5'
import MessageInput from '@/components/inputs/message-input'
import Messages from '@/components/messages'
import SideBar from '@/components/side-bar'
import Modal from '@/components/modals'
import {useAppDispatch, useAppSelector} from '@/store/hooks'
import {onModalClose as onModalCloseDispatch} from '@/store/reducers/modalSlice'
import AddContactModal from '@/components/modals/add-contact-modal'
import useSocket from '@/hooks/useSocket'
import {User} from '@/interfaces/user-interfaces'

const App: React.FC = () => {
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen)
  const dispatch = useAppDispatch()
  const onModalClose = useCallback(() => {
    dispatch(onModalCloseDispatch(null))
  }, [])
  const socket = useSocket()
  const {id} = useAppSelector((state) => state.auth.user as User)
  const {chosenConversationId, conversation} = useAppSelector((state) => state.conversation)

  const onNewMessage = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, ref: React.MutableRefObject<null | HTMLInputElement>) => {
      if (ref.current?.value && event.key === 'Enter') {
        if (!chosenConversationId) {
          return
        }

        const newMessage = {
          text: ref.current.value,
          from: id,
          conversationId: chosenConversationId,
        }

        socket.emit('message', {message: newMessage, conversation, myUserId: id})
        ref.current.value = ''
      }
    },
    [chosenConversationId, id, socket, conversation]
  )

  return (
    <>
      <Container>
        <SidebarWrapper>
          <SideBar />
        </SidebarWrapper>

        <MessagesWrapper>
          {chosenConversationId ? <Messages /> : <StyledH2>Please choose or create contact</StyledH2>}

          {chosenConversationId && (
            <InputContainer>
              <MessageInput onSubmit={onNewMessage} />
              <StyledIcon />
            </InputContainer>
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
  text-align: center;
  margin-top: 16px;
`

export default App
