import {findAllChats} from '@/api/chat-api'
import errorHandler from '@/utils/error-handler'
import React, {useState, useEffect, useMemo} from 'react'
import styled from 'styled-components'
import Contacts from '../contacts'
import ActionsHeader from './actions-header'
import {Chat} from '@/interfaces/chat-interfaces'
import {useAppSelector} from '@/store/hooks'
import {User} from '@/interfaces/auth-interfaces'
import {findUser as findUserApi} from '@/api/user-api'

interface contact {
  id?: number
  myUser?: User
  otherUser?: User
}

const findUser = (id: string) => findUserApi(id)

const SideBar: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const myUserId = useAppSelector((state) => state.auth.user?.id as number)

  const fetchChats = async () => {
    try {
      const {data} = await findAllChats()
      setChats(data.chats)
    } catch (error) {
      errorHandler(error)
    }
  }

  const findOtherUserId = (array: number[], myUserId: number) => {
    return array.find((item) => myUserId !== item)
  }

  const apiCalls = useMemo(() => {
    const calls = []
    for (const chat of chats) {
      const otherUserId = findOtherUserId(chat.participants, myUserId)
      if (typeof otherUserId === 'number') {
        calls.push(findUser(otherUserId.toString()))
      }
    }

    return Promise.all(calls).then((results) => console.log(results))
  }, [chats])

  // const contacts = useMemo(async () => {
  //   chats.map((chat) => {
  //     const contact: contact = {}
  //     contact.id = chat.id
  //   })
  // }, [chats])

  useEffect(() => {
    fetchChats()
  }, [])

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
