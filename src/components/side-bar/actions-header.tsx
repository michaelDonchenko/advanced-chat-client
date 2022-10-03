import React, {useCallback, useState, useMemo} from 'react'
import styled from 'styled-components'
import {RiMenu3Fill} from 'react-icons/ri'
import {BiSearch} from 'react-icons/bi'
import Dropdown from '@/components/dropdown'
import {useAppDispatch, useAppSelector} from '@/store/hooks'
import {onModalOpen} from '@/store/reducers/modalSlice'
import {logout} from '@/store/reducers/authSlice'
import {resetChosenConversation} from '@/store/reducers/conversationSlice'
import useSocket from '@/hooks/useSocket'
import {User} from '@/interfaces/user-interfaces'

const ActionsHeader: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const dispatch = useAppDispatch()
  const socket = useSocket()
  const user = useAppSelector((state) => state.auth.user as User)

  const toggleMenu = useCallback(() => {
    setIsMenuVisible((prev) => !prev)
  }, [])

  const menuItems = [
    {
      label: 'Add Contact',
      onClick: () => {
        dispatch(onModalOpen(null))
      },
    },
    {
      label: 'Logout',
      onClick: () => {
        socket.emit('logout', user.id)
        window.localStorage.clear()
        dispatch(logout())
        dispatch(resetChosenConversation())
      },
    },
  ]

  return (
    <Container>
      <Heading>
        <h2>Contacts</h2>
        <MenuIcon onClick={toggleMenu} size={22} />
        {isMenuVisible && <Dropdown menuItems={menuItems} isOpen={isMenuVisible} />}
      </Heading>

      <SearchContainer>
        <SearchIcon size={16} />
        <SearchBar placeholder='Search for chats' />
      </SearchContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
`

const MenuIcon = styled(RiMenu3Fill)`
  cursor: pointer;
  margin-left: auto;
  fill: ${({theme}) => theme.palette.primary.light};
`
const SearchIcon = styled(BiSearch)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 6px;
`

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`

const SearchBar = styled.input`
  -webkit-appearance: none;
  outline: none;
  padding: 4px 4px 4px 26px;
  font-size: 18px;
  background-color: ${({theme}) => theme.palette.background.light};
  border: none;
  border-radius: 4px;
  width: 100%;
`

export default ActionsHeader
