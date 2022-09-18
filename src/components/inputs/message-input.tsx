import React from 'react'
import styled from 'styled-components'

const MessageInput: React.FC = () => {
  return <Input placeholder='Write a message...' />
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
