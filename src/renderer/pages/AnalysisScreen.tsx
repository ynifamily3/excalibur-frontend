import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";
import { useDispatch } from "react-redux";
import { setTransparentAction, setNoTransparentAction } from "slices/uiSlice";
import { ipcRenderer } from "electron";
import { useHistory } from "react-router-dom";

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

const Content = styled.div`
  overflow: hidden;
`;

export default function AnalysisScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [isFold, setFold] = useState(false);
  const history = useHistory();
  useEffect(() => {
    dispatch(setTransparentAction());
  }, [dispatch]);
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

      <Content style={isFold ? { display: "none" } : { flex: 1 }}>
        <Button
          color="black"
          onClick={() => {
            dispatch(setNoTransparentAction({ alwaysOnTop: false }));
            history.replace("/dashboard");
          }}
        >
          대시보드
        </Button>
        <Button color="black">학생</Button>
        <Button color="black">퀴즈</Button>
        <Button color="black">설정</Button>
      </Content>
    </Wrapper>
  );
}
