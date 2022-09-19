import MessageInput from '@/components/inputs/message-input'
import Messages from '@/components/messages'
import SideBar from '@/components/side-bar'
import React from 'react'
import styled from 'styled-components'
import {IoSendSharp} from 'react-icons/io5'

const App: React.FC = () => {
  return (
    <Container>
      <SidebarWrapper>
        <SideBar />
      </SidebarWrapper>

      <MessagesWrapper>
        <Messages />

        <InputContainer>
          <MessageInput />
          <StyledIcon />
        </InputContainer>
      </MessagesWrapper>
    </Container>
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

export default App
