import React from "react";
import styled from "styled-components";

interface DropDownProps {
  menuItems: MenuItem[];
  isOpen: boolean;
}

interface MenuItem {
  label: string;
  onClick: () => any;
}

export const Dropdown: React.FC<DropDownProps> = ({menuItems}) => {
  return (
    <Container>
      {menuItems.map((item) => (
        <MenuItem key={item.label} onClick={item.onClick}>
          {item.label}
        </MenuItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 180px;
  background-color: ${({theme}) => theme.palette.background.dark};
  position: absolute;
  z-index: 2;
  right: 0;
  top: 35px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  flex-direction: column;
  transition: all 0.4s;
`;

const MenuItem = styled.div`
  padding: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({theme}) => theme.palette.background.light};
  }
`;
