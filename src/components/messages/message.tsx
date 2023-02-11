import React from "react";
import useAuthContext from "@/store/authContext";
import {Message as MessageI} from "@/interfaces";
import styled from "styled-components";
import moment from "moment";

export const Message = React.memo(({message}: {message: MessageI}) => {
  const {user} = useAuthContext();
  const isMyMessage = user?.id === message.from;

  return (
    <StyledMessage isMyMessage={isMyMessage}>
      <p>{message.text}</p>
      <CreatedAt>{moment(message.createdAt).format("lll")}</CreatedAt>
    </StyledMessage>
  );
});

const StyledMessage = styled.div<{isMyMessage: boolean}>`
  width: fit-content;
  max-width: 500px;
  border-radius: 15px;
  padding: 6px 10px;
  background-color: ${({theme, isMyMessage}) =>
    isMyMessage ? theme.palette.primary.main : theme.palette.gray.main};
  margin-bottom: 8px;
  margin-left: ${({isMyMessage}) => (isMyMessage ? "auto" : "0")};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const CreatedAt = styled.p`
  text-align: right;
  margin-top: 6px;
  font-size: 12px;
`;
