import errorHandler from '@/utils/error-handler'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Contacts from '../contacts'
import ActionsHeader from './actions-header'
import {Chat} from '@/interfaces/chat-interfaces'
import {useAppSelector} from '@/store/hooks'

const SideBar: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const myUserId = useAppSelector((state) => state.auth.user?.id as number)

  useEffect(() => {}, [])

  return (
    <Container>
      <ActionsHeader />
      <Contacts contacts={chats} />
    </Container>
  )
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({theme}) => theme.palette.gray.main};
`

export default SideBar
