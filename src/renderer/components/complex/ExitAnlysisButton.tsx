import React from "react";
import color from "styles/color";
import styled from "styled-components";
import theme from "styles/theme";
import X from "../atoms/svg/X";
import MB from "../atoms/svg/MiniBookmark";
import MT from "../atoms/svg/MiniTimer";
import MP from "../atoms/svg/MiniPeople";

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

const StatusBar = styled.div`
  display: flex;
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
  /* align-items: center; */
`;

export default function AnalysisButton(): JSX.Element {
  return (
    <>
      <StatusBar>
        <div style={{ fontSize: theme.size.h4 + "px", marginBottom: "10px" }}>
          제주 해녀의 이해
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ display: "flex", flex: 1 }}>
            <MB />
            &nbsp;99차시
          </span>
          <span style={{ display: "flex", flex: 1 }}>
            <MT />
            &nbsp;00:11:57
          </span>
          <span style={{ display: "flex", flex: 1 }}>
            <MP />
            &nbsp;999명
          </span>
        </div>
      </StatusBar>
      <Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "24px",
            height: "24px",
            marginRight: "6px",
          }}
        >
          <X />
        </div>
        분석 종료
      </Button>
    </>
  );
}
