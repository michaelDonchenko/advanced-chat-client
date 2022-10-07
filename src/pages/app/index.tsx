import React, {useCallback} from 'react'
import styled from 'styled-components'
import MessageInput from '@/components/inputs/message-input'
import Messages from '@/components/messages'
import SideBar from '@/components/side-bar'
import Modal from '@/components/modals'
import AddContactModal from '@/components/modals/add-contact-modal'
import useModalContext from '@/context/modalContext'
import useQueryParams from '@/hooks/useQueryParams'

const App: React.FC = () => {
  const {isModalOpen, closeModal} = useModalContext()
  const onModalClose = useCallback(() => closeModal(), [])
  const queryParams = useQueryParams()
  const conversationId = Number(queryParams.get('conversation_id'))

  return (
    <>
      <Container>
        <SidebarWrapper>
          <SideBar />
        </SidebarWrapper>

        <MessagesWrapper>
          {!conversationId ? (
            <StyledH2>Please choose or create contact</StyledH2>
          ) : (
            <>
              <Messages />
              <MessageInput />
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

const StyledH2 = styled.h2`
  margin-top: 16px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`

export default App
