import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";
import { useDispatch } from "react-redux";
import { setTransparentAction } from "slices/uiSlice";
import { ipcRenderer } from "electron";

const Wrapper = styled.div`
  -webkit-app-region: drag;
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
