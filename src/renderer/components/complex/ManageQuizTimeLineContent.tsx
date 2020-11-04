import React, { useContext } from "react";
import styled from "styled-components";
import X from "components/atoms/svg/X";
import theme from "styles/theme";
import Button from "components/atoms/Button";
import { QuizBox } from "components/atoms/QuizBox";

// 모달 띄우기
import { ModalContext } from "contexts/modalContext";
import AddNewQuizMD from "./AddNewQuizMD";

const Wrapper = styled.div`
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
`;

const LI = styled.li`
  display: flex;
  height: auto;
  min-height: 100px;
  margin-bottom: 50px;
`;

const data = [
  {
    time: "now",
    content: "1형식은 주어와 {{answer}}로 구분되어 있다.",
    answer: "동사",
    isQuestioned: true,
    responseRate: 100,
    correctAnswerRate: 83,
  },
  {
    time: "1:10:23",
    content:
      "{{answer}}은 상쇄간섭으로 외부 소음을 차단하며 소음이 심한 장소에서도 잘 들을 수 있게 하는 것이다.",
    answer: "노이즈캔슬링",
    isQuestioned: false,
    responseRate: 0,
    correctAnswerRate: 0,
  },
  {
    time: "55:30",
    content:
      "처음 가본 곳인데 예전에 와본 것 같거나 처음 하는 일을 이전에 한 것 같은 이상한 현상이다.",
    answer: "데자뷰",
    isQuestioned: true,
    responseRate: 94,
    correctAnswerRate: 65,
  },
  {
    time: "45:03",
    content: '{{answer}}는 "티켓"을 기반으로 동작하는 컴퓨터 보안이다.',
    answer: "커베로스",
    isQuestioned: false,
    responseRate: 0,
    correctAnswerRate: 0,
  },
];

export default function ManageQuizTimeLineContent(): JSX.Element {
  const { handleModal } = useContext(ModalContext);
  return (
    <Wrapper>
      <Button
        color="white"
        style={{
          backgroundColor: "#032D3C",
          borderRadius: 0,
          width: "200px",
          padding: "15px",
          margin: 0,
          marginBottom: 16,
          alignSelf: "flex-end",
          fontSize: `${theme.size.h5}px`,
        }}
        onClick={() => {
          handleModal(<AddNewQuizMD />);
        }}
      >
        +새로운 퀴즈 출제하기
      </Button>
      <UL>
        {data.map((x, i) => {
          return (
            <LI key={"question-" + i}>
              <QuizBox>
                <div
                  style={{
                    position: "absolute",
                    right: 18,
                    top: 18,
                  }}
                >
                  <X color={"gray"} />
                </div>
                {x.content.split(/({{answer}})/).map((x, i_) => {
                  if (x.length === 0) return;
                  if (x !== "{{answer}}")
                    return (
                      <div
                        key={"sentence" + i + "-" + i_}
                        style={{
                          height: 20,
                          wordBreak: "break-all",
                        }}
                      >
                        {x.replace(/ /g, "\u00A0")}
                      </div>
                    );
                  else
                    return (
                      <div
                        key={"sentence" + i + "-" + i_}
                        style={{
                          backgroundColor: "yellow",
                          wordBreak: "break-all",
                          height: 20,
                        }}
                      >
                        {data[i].answer}
                      </div>
                    );
                })}
                <div
                  style={{
                    position: "absolute",
                    right: 48,
                    top: 16,
                    fontStyle: "italic",
                    color: "gray",
                  }}
                >
                  {x.isQuestioned && "출제됨"}
                </div>
                {x.isQuestioned ? (
                  <div
                    style={{
                      position: "absolute",
                      right: 16,
                      bottom: 16,
                      color: "gray",
                    }}
                  >
                    응답률 {x.responseRate}% / 정답률 {x.correctAnswerRate}%
                  </div>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      right: 16,
                      bottom: 16,
                      // transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Button
                      color="black"
                      style={{ margin: 0, marginRight: 16 }}
                    >
                      수정
                    </Button>
                    <Button color="blue" style={{ margin: 0 }}>
                      출제
                    </Button>
                  </div>
                )}
              </QuizBox>
            </LI>
          );
        })}
      </UL>
    </Wrapper>
  );
}
