import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({children, onClick, type}) => {
  return (
    <StyledButton type={type || "submit"} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  height: 35px;
  width: fit-content;
  max-width: 200px;
  min-width: 160px;
  background-color: ${({theme}) => theme.palette.primary.main};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
  padding: 2px 10px;

  &:hover {
    background-color: ${({theme}) => theme.palette.primary.dark};
  }
`;
