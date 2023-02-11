import React from "react";
import {Link as RouterLink} from "react-router-dom";
import styled from "styled-components";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({href, children}) => {
  return <StyledLink to={href}>{children}</StyledLink>;
};

const StyledLink = styled(RouterLink)`
  color: ${({theme}) => theme.palette.primary.main};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
