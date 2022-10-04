import useAuthContext from '@/context/authContext'
import {Message as MessageI} from '@/interfaces/user-interfaces'
import styled from 'styled-components'

const Message = ({message}: {message: MessageI}) => {
  const {user} = useAuthContext()
  const isMyMessage = user?.id === message.from

  return (
    <StyledMessage isMyMessage={isMyMessage}>
      <p>{message.text}</p>
      <CreatedAt>{message.createdAt.toString()}</CreatedAt>
    </StyledMessage>
  )
}

const StyledMessage = styled.div<{isMyMessage: boolean}>`
  width: fit-content;
  max-width: 500px;
  border-radius: 15px;
  padding: 4px 8px;
  background-color: ${({theme, isMyMessage}) => (isMyMessage ? theme.palette.primary.main : theme.palette.gray.main)};
  margin-bottom: 8px;
  margin-left: ${({isMyMessage}) => (isMyMessage ? 'auto' : '0')};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`

const CreatedAt = styled.p`
  text-align: right;
  margin-top: 2px;
`

export default Message
