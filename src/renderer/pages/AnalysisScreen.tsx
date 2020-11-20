import Button from "components/atoms/Button";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "rootReducer";
import {
  changeDashboardPage,
  setNoTransparentAction,
  setTransparentAction,
} from "slices/uiSlice";
import styled from "styled-components";

const Dragable = styled.div`
  cursor: move;
  -webkit-app-region: drag;
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-around;
  align-items: center;
`;

const Button2 = styled(Button)`
  margin: 0;
  border: 0;
  height: 64px;
`;

export default function AnalysisScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [isFold, setFold] = useState(false);
  const history = useHistory();
  const { analysisStat, analysisTime } = useSelector(
    (state: RootState) => state.global
  );

  useEffect(() => {
    dispatch(setTransparentAction());
  }, [dispatch]);

  // 현재 시간을 시작으로 분석을 시작한다.
  const [second, setSecond] = useState(
    Math.floor(+new Date() / 1000) - analysisTime
  );

  useEffect(() => {
    const id = setInterval(() => setSecond((sec) => sec + 1), 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Wrapper>
      <Dragable>
        .<br />.<br />.
      </Dragable>
      <Button
        color="black"
        onClick={() => {
          if (!isFold) {
            ipcRenderer.send("analysisFold");
            setFold(true);
          } else {
            ipcRenderer.send("analysisOpen");
            setFold(false);
          }
        }}
        style={{
          margin: 0,
          width: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
        }}
      >
        {!isFold ? ">|" : "|<"}
      </Button>
      <ContentWrapper style={isFold ? { display: "none" } : { flex: 1 }}>
        <Content
          style={{
            alignSelf: "flex-start",
            marginLeft: "15px",
            height: "24px",
            columnGap: "16px",
          }}
        >
          <span>
            [{analysisStat.code}] {analysisStat.name}
          </span>
          <span>{new Date(second * 1000).toISOString().substr(11, 8)}</span>
        </Content>
        <Content>
          <Button2
            color="black"
            onClick={() => {
              dispatch(setNoTransparentAction({ alwaysOnTop: false }));
              dispatch(changeDashboardPage("main"));
              history.replace("/dashboard");
            }}
          >
            대시보드
          </Button2>
          <Button2
            color="black"
            onClick={() => {
              dispatch(setNoTransparentAction({ alwaysOnTop: false }));
              dispatch(changeDashboardPage("managelecture"));
              history.replace("/dashboard");
            }}
          >
            내 강의
          </Button2>
          <Button2
            color="black"
            onClick={() => {
              dispatch(setNoTransparentAction({ alwaysOnTop: false }));
              dispatch(changeDashboardPage("managequiz"));
              history.replace("/dashboard");
            }}
          >
            퀴즈 출제
          </Button2>
          <Button2
            color="black"
            onClick={() => {
              dispatch(setNoTransparentAction({ alwaysOnTop: false }));
              dispatch(changeDashboardPage("listlectureanalysis"));
              history.replace("/dashboard");
            }}
          >
            강의분석 기록
          </Button2>
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
}
