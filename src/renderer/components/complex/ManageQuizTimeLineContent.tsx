import Button from "components/atoms/Button";
import { QuizBox } from "components/atoms/QuizBox";
import X from "components/atoms/svg/X";
// 모달 띄우기
import { ModalContext } from "contexts/modalContext";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IQuizElementC, getQuizzes, pickQuiz } from "repos/quiz";
import { RootState } from "rootReducer";
import { changeDashboardPage } from "slices/uiSlice";
import styled from "styled-components";
import theme from "styles/theme";

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

export default function ManageQuizTimeLineContent(): JSX.Element {
  const dispatch = useDispatch();
  const { handleModal } = useContext(ModalContext);

  const { mode, analysisStat } = useSelector(
    (state: RootState) => state.global
  );
  // 분석 세션이 종료되면 내 강의로 튕기도록 함
  useEffect(() => {
    if (mode === "normal") {
      dispatch(changeDashboardPage("managelecture"));
    }
  }, [mode, dispatch]);

  // 퀴즈 목록을 로드함.
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<IQuizElementC[]>([]);

  const getQuizzesAPI = useCallback(async () => {
    if (!isPending) return; // 해당 항목으로 트리거
    const ret = await getQuizzes({ sessionId: analysisStat.sessionId });
    setIsPending(false);
    setData(ret.data.data);
  }, [analysisStat, isPending]);
  useEffect(() => {
    getQuizzesAPI();
  }, [getQuizzesAPI, isPending]);

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
          handleModal(<AddNewQuizMD fireFn={setIsPending} />);
        }}
      >
        +새로운 퀴즈 출제하기
      </Button>
      <UL>
        {isPending && <div>로딩 중...</div>}
        {!isPending &&
          data
            .slice()
            .reverse()
            .map((x, i) => {
              return (
                <LI key={"question-" + x.id}>
                  <QuizBox style={{ flexDirection: "column" }}>
                    <div
                      style={{
                        position: "absolute",
                        right: 18,
                        top: 18,
                      }}
                    >
                      <X color={"gray"} />
                    </div>
                    {x.content.split(/({{answer}})/).map((x_, i_) => {
                      if (x_.length === 0) return;
                      if (x_ !== "{{answer}}")
                        return (
                          <div
                            key={"sentence" + x.id + "-" + i_}
                            style={{
                              height: 20,
                              wordBreak: "break-all",
                            }}
                          >
                            {x_.replace(/ /g, "\u00A0")}
                          </div>
                        );
                      else
                        return (
                          <div
                            key={"sentence" + x.id + "-" + i_}
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
                    <div>
                      1. {x.example1}
                      {x.answer === 1 && " - (정답)"}
                    </div>
                    <div>
                      2. {x.example2}
                      {x.answer === 2 && " - (정답)"}
                    </div>
                    <div>
                      3. {x.example3}
                      {x.answer === 3 && " - (정답)"}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: 48,
                        top: 16,
                        fontStyle: "italic",
                        color: "gray",
                      }}
                    >
                      {x.isPick !== 0 && "출제됨"}
                    </div>
                    {x.isPick !== 0 ? (
                      <div
                        style={{
                          position: "absolute",
                          right: 16,
                          bottom: 16,
                          color: "gray",
                        }}
                      >
                        {/* 응답률 0% / 정답률 0% */}
                      </div>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          right: 16,
                          bottom: 16,
                        }}
                      >
                        <Button
                          color="blue"
                          style={{ margin: 0, marginRight: 0 }}
                          onClick={() => {
                            // 퀴즈 출제
                            pickQuiz({
                              analysisSessionId: analysisStat.sessionId,
                              quizId: x.id,
                            })
                              .then(() => {
                                // refresh Fire Function
                                setIsPending(true);
                              })
                              .catch((e) => {
                                console.log("출제 에러:", e);
                              });
                          }}
                        >
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
