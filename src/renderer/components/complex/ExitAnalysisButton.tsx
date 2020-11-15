import MinimodeButton from "components/atoms/svg/MinimodeButton";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "rootReducer";
import styled from "styled-components";
import theme from "styles/theme";

import MP from "../atoms/svg/MiniPeople";
import MT from "../atoms/svg/MiniTimer";
import X from "../atoms/svg/X";

// import MB from "../atoms/svg/MiniBookmark";

const Button = styled.button`
  background-color: rgb(254, 72, 80);
  font-size: ${theme.size.h4}px;
  margin: 1em;
  margin-top: 0;
  padding: 0.25em 1em;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e4e4e4;
  height: 40px;
  &:active {
    transform: translateY(1px);
  }
`;

const StatusBar = styled.div<{ isFold: boolean }>`
  display: flex;
  position: relative;
  font-size: ${theme.size.h4}px;
  flex-direction: column;
  background-color: rgb(79, 79, 79);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #e4e4e4;
  margin: 18px;
  margin-bottom: 0;
  box-sizing: content-box;
  padding: 0.25em 18px;
  height: 67px;
  justify-content: center;
  font-size: ${theme.size.h5}px;
`;

const TominiButton = styled.button<{ isFold: boolean }>`
  cursor: pointer;
  border: none;
  background-color: inherit;
  position: absolute;
  top: ${({ isFold }) => (isFold ? "40px" : "12px")};
  right: ${({ isFold }) => (isFold ? "0" : "12px")};
`;

export default function AnalysisButton({
  onClick,
  isFold,
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isFold: boolean;
}): JSX.Element {
  const history = useHistory();
  const { analysisStat, analysisTime } = useSelector(
    (state: RootState) => state.global
  );

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
    <>
      <StatusBar isFold={isFold}>
        <TominiButton
          isFold={isFold}
          onClick={() => {
            history.replace("/analysis");
          }}
        >
          <MinimodeButton color="#e4e4e4" />
        </TominiButton>
        {!isFold && (
          <>
            <div
              style={{ fontSize: theme.size.h4 + "px", marginBottom: "10px" }}
            >
              {analysisStat.name}
            </div>

            <div style={{ display: "flex" }}>
              {/* <span style={{ display: "flex", flex: 1 }}>
                <MB />
                &nbsp;.
              </span> */}
              {/* 차시 */}
              <span style={{ display: "flex", flex: 1 }}>
                <MT />
                &nbsp;{new Date(second * 1000).toISOString().substr(11, 8)}
              </span>
              <span style={{ display: "flex", flex: 1 }}>
                <MP />
                &nbsp;0명
              </span>
            </div>
          </>
        )}
      </StatusBar>
      <Button onClick={onClick}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "24px",
            height: "24px",
            marginRight: isFold ? 0 : "6px",
          }}
        >
          <X />
        </div>
        {!isFold && "분석 종료"}
      </Button>
    </>
  );
}
