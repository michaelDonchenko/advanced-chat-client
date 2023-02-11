import React from "react";
import styled from "styled-components";
import {Contacts} from "../contacts";
import {ActionsHeader} from "./actionsHeader";

export const SideBar: React.FC = () => {
  return (
    <Container>
      <ActionsHeader />
      <Contacts />
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({theme}) => theme.palette.gray.main};
`;
