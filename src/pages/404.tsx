import Button from '@/components/buttons/button'
import React, {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  const onClick = useCallback(() => {
    navigate('/')
  }, [])

  return (
    <Container>
      <Title>404 The page was not found!</Title>
      <Button onClick={onClick}>back home</Button>
    </Container>
  )
}

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default NotFound
