import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {RiMenu3Fill} from "react-icons/ri";
import {BiSearch} from "react-icons/bi";
import {Dropdown} from "@/components/dropdown";
import useAuthContext from "@/store/authContext";
import useModalContext from "@/store/modalContext";
import useSocketContext from "@/store/socketContext";
import useConversationContext from "@/store/conversationContext";
import useContactsContext from "@/store/contactsContext";

export const ActionsHeader = () => {
  const authContext = useAuthContext();
  const {socket} = useSocketContext();
  const {openModal} = useModalContext();
  const {setFilterKey} = useContactsContext();
  const {resetConversationState} = useConversationContext();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const onFilter = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterKey(event.target.value);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuVisible((prev) => !prev);
  }, []);

  const menuItems = [
    {
      label: "My Profile",
      onClick: () => openModal("profile"),
    },
    {
      label: "Add Contact",
      onClick: () => openModal("contact"),
    },
    {
      label: "Logout",
      onClick: () => {
        socket.emit("logout", authContext.user?.id);
        authContext.logout();
        window.localStorage.clear();
        resetConversationState();
      },
    },
  ];

  return (
    <Container>
      <Heading>
        <h2>Contacts</h2>
        <MenuIcon onClick={toggleMenu} size={22} />
        {isMenuVisible && <Dropdown menuItems={menuItems} isOpen={isMenuVisible} />}
      </Heading>

      <SearchContainer>
        <SearchIcon size={16} />
        <SearchBar defaultValue="" placeholder="Search contacts" onChange={onFilter} />
      </SearchContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
`;

const MenuIcon = styled(RiMenu3Fill)`
  cursor: pointer;
  margin-left: auto;
  fill: ${({theme}) => theme.palette.primary.light};
`;
const SearchIcon = styled(BiSearch)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 6px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchBar = styled.input`
  -webkit-appearance: none;
  outline: none;
  padding: 4px 4px 4px 26px;
  font-size: 18px;
  background-color: ${({theme}) => theme.palette.background.light};
  border: none;
  border-radius: 4px;
  width: 100%;
`;
