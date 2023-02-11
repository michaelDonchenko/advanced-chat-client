import useAuthContext from "@/store/authContext";
import useConversationContext from "@/store/conversationContext";
import useSocketContext from "@/store/socketContext";
import useQueryParams from "@/hooks/useQueryParams";
import {IoSendSharp} from "react-icons/io5";
import React, {useRef, useCallback} from "react";
import styled from "styled-components";

type NewEvent = React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGElement, MouseEvent>;

export const MessageInput: React.FC = () => {
  const {user} = useAuthContext();
  const {socket} = useSocketContext();
  const queryParams = useQueryParams();
  const {conversation} = useConversationContext();
  const conversationId = Number(queryParams.get("conversation_id"));
  const ref = useRef(null);

  const sendMessage = useCallback(
    (ref: React.MutableRefObject<null | HTMLInputElement>) => {
      if (!ref?.current?.value) {
        return;
      }
      const newMessage = {
        text: ref.current.value,
        from: user?.id,
        conversationId: conversationId,
        createdAt: new Date(),
      };

      console.log({newMessage, conversation, user});
      socket.emit("message", {message: newMessage, conversation: conversation, myUserId: user?.id});
      ref.current.value = "";
    },
    [conversation, user]
  );

  const onSubmit = useCallback(
    (event: NewEvent, ref: React.MutableRefObject<null | HTMLInputElement>) => {
      if (!conversation) {
        return;
      }

      if (event.type === "keydown") {
        if ((event as React.KeyboardEvent).key !== "Enter") {
          return;
        }
        return sendMessage(ref);
      } else {
        return sendMessage(ref);
      }
    },
    [conversation]
  );

  return (
    <InputContainer>
      <Input
        onKeyDown={(event) => onSubmit(event, ref)}
        ref={ref}
        placeholder="Write a message..."
      />
      <StyledIcon onClick={(event) => onSubmit(event, ref)} />
    </InputContainer>
  );
};

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  outline: none;
  padding: 6px;
  font-size: 18px;
  background-color: ${({theme}) => theme.palette.background.dark};
  border: 2px solid ${({theme}) => theme.palette.gray.main};
  border-radius: 4px;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(IoSendSharp)`
  fill: ${({theme}) => theme.palette.primary.light};
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
`;
