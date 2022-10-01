import React, {useEffect} from 'react'
import styled from 'styled-components'
import Contacts from '../contacts'
import ActionsHeader from './actions-header'

const SideBar: React.FC = () => {
  useEffect(() => {}, [])

  return (
    <Container>
      <ActionsHeader />
      <Contacts />
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
