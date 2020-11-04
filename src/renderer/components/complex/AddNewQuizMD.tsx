import React, { FC } from "react";
import X from "components/atoms/svg/X";
import styled from "styled-components";
import { QuizBox as QuizBoxOriginal } from "components/atoms/QuizBox";
import { ModalContext } from "contexts/modalContext";
import { ipcRenderer } from "electron";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const QuizBox = styled(QuizBoxOriginal)`
  margin-top: 16px;
  height: 33px;
`;

const Button = styled.button`
  width: 32;
  height: 32;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  border: none;
  background-color: inherit;
  &:active {
    transform: translateY(1px);
  }
`;

const AddNewQuizMD: FC = () => {
  const { handleModal } = React.useContext(ModalContext);

  return (
    <Wrapper>
      <Button onClick={() => handleModal()}>
        <X width="32" height="32" color="black" />
      </Button>
      <QuizBox>퀴즈박스..{Math.floor(Math.random() * 10)}</QuizBox>
      <Button
        onClick={() => {
          (async function () {
            const proc = JSON.parse(await ipcRenderer.invoke("getProcessList"));
            console.log(proc);
          })();
        }}
      >
        눌러봐!
      </Button>
    </Wrapper>
  );
};

export default AddNewQuizMD;
