import Button from "components/atoms/Button";
import { ipcRenderer } from "electron";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ModalContext } from "contexts/modalContext";

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

////

const QuizWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3em;
`;

const TimerWrapper = styled.div`
  border: 3px solid #2e2f31;
  width: 90%;
  box-sizing: border-box;
  height: 1.2em;
  position: relative;
  margin: 1em 0;
`;

const TimerBar = styled.div`
  background-color: #2e2f31;
  width: ${({ time = 100 }: { time: number }) => {
    return time + "%";
  }};
  height: 100%;
  left: 0;
  top: 0;
`;

const TimerText = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${({ time = 100 }: { time: number }) => {
    return time + "%";
  }};
  width: 3em;
  height: 3em;
  background-image: url(assets/timebal.png);
  background-size: cover;
  top: -3.5em;
  transform: translate(-65%, 0);
`;

const Problem = styled.div`
  width: 90%;
  display: flex;
  border: 3px solid black;
  justify-content: center;
  align-items: center;
  height: 4em;
`;

////

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
              <QuizWrapper>
                <TimerWrapper>
                  <TimerBar time={60}></TimerBar>
                  <TimerText time={60}>3</TimerText>
                </TimerWrapper>
                <Problem>문제 내용...</Problem>
                <ul>
                  <li>1번 선택지</li>
                  <li>2번 선택지</li>
                  <li>3번 선택지</li>
                  <li>4번 선택지</li>
                </ul>
              </QuizWrapper>
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
