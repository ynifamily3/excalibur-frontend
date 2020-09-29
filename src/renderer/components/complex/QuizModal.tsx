import { ModalContext } from "contexts/modalContext";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QuizModalProps } from "types/components/complex/QuizModal";
import clsx from "clsx";

const QuizWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3em;
  ${({ start = 1 }: { start: number }) => {
    return start === 1
      ? `
      animation-duration: 0.3s;
      animation-name: appearQuiz;
      animation-timing-function: ease-in;
    `
      : `
      animation-duration: 0.3s; 
      animation-name: disappearQuiz;
      animation-timing-function: ease-out;
      `;
  }}
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
  width: 0;
  height: 100%;
  left: 0;
  top: 0;
  animation-duration: ${({ time = 5 }: { time: number }) => {
    return time + "s";
  }};
  animation-name: quizbar;
  animation-timing-function: linear;
`;

const TimerText = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  width: 3em;
  height: 3em;
  background-image: url(assets/timebal.png);
  background-size: cover;
  top: -3.5em;
  transform: translate(-65%, 0);
  animation-duration: ${({ time = 5 }: { time: number }) => {
    return time + "s";
  }};
  animation-name: quizbarText;
  animation-timing-function: linear;
`;

const Problem = styled.div`
  width: 90%;
  display: flex;
  border: 3px solid black;
  justify-content: center;
  align-items: center;
  height: 4em;
  margin-bottom: 1em;
`;

const Selections = styled.ul`
  list-style: none;
  width: 90%;
  margin: 0;
  padding: 0;
`;

const Selection = styled.li`
  margin: 1em 0;
  padding: 1em;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 20px 20px 40px #d9d9d9, -20px -20px 40px #ffffff;
`;

export default function QuizModal(
  props: React.PropsWithChildren<QuizModalProps>
): JSX.Element {
  const { timeLimit, description, isAnswer, selections } = props;
  const { handleModal } = React.useContext(ModalContext);
  const [currentTime, setCurrentTime] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        return prev - 1000 > 0 ? prev - 1000 : 0;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (currentTime === 0) {
      setTimeout(() => {
        handleModal(); // 모달 꺼지게 만듦
      }, 300);
    }
  }, [handleModal, currentTime]);

  return (
    <QuizWrapper start={currentTime !== 0 ? 1 : 0}>
      <TimerWrapper>
        <TimerBar time={Math.ceil(timeLimit / 1000)}></TimerBar>
        <TimerText time={Math.ceil(timeLimit / 1000)}>
          {Math.ceil(currentTime / 1000)}
        </TimerText>
      </TimerWrapper>
      <Problem>{description}</Problem>
      <Selections>
        {selections.map((selectionText, i) => {
          return (
            <Selection
              key={"QuizSelection-" + i}
              onClick={() => {
                setCurrentTime(0);
              }}
            >
              {selectionText}
              {isAnswer[i] ? " (정답)" : ""}
            </Selection>
          );
        })}
      </Selections>
    </QuizWrapper>
  );
}
