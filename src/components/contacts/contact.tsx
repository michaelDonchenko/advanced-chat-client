import {Contact as ContactI} from "@/interfaces";
import React, {useCallback} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import useQueryParams from "@/hooks/useQueryParams";
import moment from "moment";

export const Contact: React.FC<{contact: ContactI}> = React.memo((props) => {
  const {photo, username, conversationId, unreadMessages, lastMessage} = props.contact;
  const queryParams = useQueryParams();
  const navigate = useNavigate();

  const activeConversationId = Number(queryParams.get("conversation_id"));
  const isActiveChat = conversationId === activeConversationId;
  const onClick = useCallback(() => {
    navigate(`/?conversation_id=${conversationId}`);
  }, [conversationId]);

  return (
    <Container isActiveChat={isActiveChat}>
      <Avatar onClick={onClick} alt="Avatar image" src={photo} />
      <InfoSection onClick={onClick}>
        <h3>{username}</h3>
        <LastMessage>{lastMessage ? lastMessage.text : "No messages yet"}</LastMessage>
        <LastMessageDate>
          {lastMessage ? `Last message: ${moment(lastMessage.updatedAt).format("L")}` : null}
        </LastMessageDate>
      </InfoSection>

      {unreadMessages ? <UnreadMessages>{unreadMessages}</UnreadMessages> : null}
    </Container>
  );
});

const Container = styled.div<{isActiveChat: boolean}>`
  display: flex;
  width: 100%;
  padding: 10px 8px;
  transition: all 0.2s;
  background-color: ${({theme, isActiveChat}) =>
    isActiveChat ? theme.palette.background.light : null};

  &:hover {
    background-color: ${({theme}) => theme.palette.background.light};
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 6px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px 8px;
  flex: 1;
  cursor: pointer;
`;

const LastMessage = styled.p`
  color: ${({theme}) => theme.palette.text};
  margin-top: 4px;
`;
const LastMessageDate = styled.p`
  color: ${({theme}) => theme.palette.primary.light};
  font-size: 14px;
`;

const UnreadMessages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 15px;
  background-color: ${({theme}) => theme.palette.primary.light};
  font-size: 14px;
`;
