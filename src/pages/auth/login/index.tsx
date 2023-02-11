import RegularLink from '@/components/links/defaultLink'
import React from 'react'
import styled from 'styled-components'
import LoginForm from './loginForm'

const Login: React.FC = () => {
  return (
    <Container>
      <Title>Login</Title>
      <LoginForm />
      <RegularLink href='/register'>Do not have an account? register</RegularLink>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({theme}) => theme.palette.background.dark};
  max-width: 500px;
  min-height: 500px;
  border-radius: 10px;
  padding: 12px;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 16px;
`

export default Login
