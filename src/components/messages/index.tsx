import styled from 'styled-components'
import Message from './message'

const Messages = () => {
  const message = {
    sender: '2',
    createdAt: '18:12',
    text: 'test text',
  }
  const message2 = {
    sender: '1',
    createdAt: '18:12',
    text: 'test text sdads saadsad sadsad sadas dsa',
  }
  return (
    <Container>
      <Message message={message2} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message2} />
      <Message message={message2} />
      <Message message={message2} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
      <Message message={message2} />
      <Message message={message} />
      <Message message={message2} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({theme}) => theme.palette.background.light};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.palette.gray.main};
    border-radius: 10px;
  }
`

export default Messages
