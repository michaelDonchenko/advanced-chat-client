import React, {useRef} from 'react'
import styled from 'styled-components'

interface MessageInputProps {
  onSubmit: (event: React.KeyboardEvent<HTMLInputElement>, ref: React.MutableRefObject<null | HTMLInputElement>) => void
}

const MessageInput: React.FC<MessageInputProps> = ({onSubmit}) => {
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
