import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

interface RegularLinkProps {
  href: string
  children: React.ReactNode
}

const RegularLink: React.FC<RegularLinkProps> = ({href, children}) => {
  return <StyledLink to={href}>{children}</StyledLink>
}

const StyledLink = styled(Link)`
  color: ${({theme}) => theme.palette.primary.main};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export default RegularLink
