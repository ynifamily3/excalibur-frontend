import Button from "components/atoms/Button";
import { ipcRenderer } from "electron";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ModalContext } from "contexts/modalContext";
import QuizModal from "components/complex/QuizModal";

const Wrapper = styled.div`
  margin-top: 7em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
`;

export default function Intro(): JSX.Element {
  const history = useHistory();
  const { handleModal } = useContext(ModalContext);
  // debug purpose
  return (
    <Wrapper>
      <H1>Excalibur - 비대면 강의 집중력 향상 솔루션</H1>
      <div>
        <Button
          onClick={() => {
            history.replace("/about");
          }}
          color="black"
          style={{
            marginTop: "20em",
            width: "10em",
            paddingTop: "1em",
            paddingBottom: "1em",
          }}
        >
          입장
        </Button>
        <Button
          onClick={() => {
            // NOTE: 퀴즈는 뜬금없이 출현하므로 IPC를 listen 하고 있어야 하는 것이 맞다.
            // 따라서 App.tsx에서 IPC를 listen 하고 있어야 한다.
            handleModal(
              <QuizModal
                isAnswer={[false, true, false, false]}
                description={"1형식은 주어와 _______ 로 구분되어 있다."}
                timeLimit={10 * 1000}
                selections={["1. 형용사", "2. 동사", "3. 관사", "4. 전치사"]}
              />
            );
          }}
          color="red"
          style={{
            marginTop: "20em",
            width: "auto",
            paddingTop: "1em",
            paddingBottom: "1em",
          }}
        >
          ⚡ 퀴즈 팝업 보기 ⚡ listen
        </Button>
      </div>
    </Wrapper>
  );
}
