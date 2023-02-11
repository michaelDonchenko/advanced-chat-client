import React, {useRef, useEffect, useCallback} from "react";
import {Portal} from "react-portal";
import styled from "styled-components";
import {BsXLg} from "react-icons/bs";

interface ModalProps {
  onModalClose: () => void;
  Content: JSX.Element;
}

const Modal: React.FC<ModalProps> = React.memo(({onModalClose, Content}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const clickListener = useCallback((event: MouseEvent) => {
    if (modalRef.current?.contains(event.target as Node)) {
      return;
    }

    onModalClose();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", clickListener);
    }, 100);

    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, []);

  return (
    <Portal>
      <Container ref={modalRef}>
        <ModalHeader>
          <ExitIcon onClick={onModalClose} />
        </ModalHeader>
        {Content}
      </Container>
    </Portal>
  );
});

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  min-height: 200px;
  background-color: ${({theme}) => theme.palette.background.light};
  z-index: 100;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 4px;
  filter: blur(0);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  padding: 10px;
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 6px;
  width: 100%;
  margin-bottom: 10px;
`;

const ExitIcon = styled(BsXLg)`
  fill: ${({theme}) => theme.palette.error};
  font-size: 20px;
  cursor: pointer;
`;

export default Modal;
