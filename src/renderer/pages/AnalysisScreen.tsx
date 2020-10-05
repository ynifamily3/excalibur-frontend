import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";
import { useDispatch } from "react-redux";
import { setTransparentAction } from "slices/uiSlice";
import { ipcRenderer } from "electron";

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

export default function AnalysisScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [isFold, setFold] = useState(false);
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
        {!isFold ? ">" : "<"}
      </Button>
    </Wrapper>
  );
}
