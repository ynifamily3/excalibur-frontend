import React from "react";
import color from "styles/color";
import styled from "styled-components";
import { RootState } from "rootReducer";
import { useSelector } from "react-redux";
import X from "components/atoms/svg/X";
import theme from "styles/theme";
import Button from "components/atoms/Button";

const Wrapper = styled.div`
  padding: 44px;
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
`;

const LI = styled.li`
  display: flex;
  height: auto;
  min-height: 100px;
  background-color: rgb(221, 235, 247);
  &:nth-child(odd) {
    background-color: rgb(226, 240, 217);
  }
  margin-bottom: 50px;
`;

const Timeline = styled.div`
  position: relative;
  width: 100px;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: white;
  border-right: 44px solid white;
`;

const Vecline = styled.div<{ dir?: string }>`
  position: absolute;
  left: 50%;
  top: ${(props) => (props.dir === "up" ? "0%" : "100%")};
  width: 2px;
  height: 50px;
  transform: translate(-50%, -50%);
  background-color: black;
`;

const QuizBox = styled.div`
  flex: 1;
  display: flex;
  box-shadow: 7px 7px 30px 0px rgba(211, 211, 211, 1);
  z-index: 1; /* 그림자 때문에 */
  padding: 18px;
  padding-top: 36px;
  position: relative;
  flex-wrap: wrap;
  padding-bottom: 48px;
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
      "{{answer}}은 상쇄간섭으로 외부 소음을 차단하며 소음이 심한 장소에서도...",
    answer: "노이즈캔슬링",
    isQuestioned: false,
    responseRate: 0,
    correctAnswerRate: 0,
  },
  {
    time: "55:30",
    content:
      "처음 가본 곳인데 예전에 와본 것 같거나 처음 하는 일을 이전에 한 것 같은 이상한...",
    answer: "데자뷰",
    isQuestioned: true,
    responseRate: 94,
    correctAnswerRate: 65,
  },
  {
    time: "45:03",
    content: '{{answer}}는 "티켓"을 기반으로 동작하는 컴퓨터 보안...',
    answer: "커베로스",
    isQuestioned: false,
    responseRate: 0,
    correctAnswerRate: 0,
  },
];

export default function ManageQuizTimeLineContent(): JSX.Element {
  return (
    <Wrapper>
      <div style={{ fontSize: theme.size.h2, marginBottom: 44 }}>
        Quiz Timeline
      </div>
      <UL>
        {data.map((x, i) => {
          return (
            <LI key={"question-" + i}>
              <Timeline>
                {i !== 0 && <Vecline dir="up" />}
                {x.time}
                {i !== data.length - 1 && <Vecline />}
              </Timeline>
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
                      right: 48,
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
                      display: "flex",
                      flexDirection: "column",
                      right: 48,
                      top: 14,
                    }}
                  >
                    <Button
                      color="black"
                      style={{ margin: 0, marginBottom: 10 }}
                    >
                      출제
                    </Button>
                    <Button color="black" style={{ margin: 0 }}>
                      수정
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
