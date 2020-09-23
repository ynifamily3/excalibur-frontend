import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "contexts/modalContext";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: white;
  position: relative;
  padding: 5em;
  box-shadow: 1em;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
`;

const Modal = (): JSX.Element => {
  const { modalContent, handleModal, modal } = React.useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
      <Wrapper>
        <Container>
          <button onClick={() => handleModal()}>&times;</button>
          <p>{modalContent}</p>
        </Container>
      </Wrapper>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
