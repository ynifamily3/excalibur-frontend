import React from "react";
import color from "styles/color";
import styled from "styled-components";
import theme from "styles/theme";
import RightArrow from "./svg/RightArrow";

const Button = styled.button`
  background-color: ${color.green[1]};
  font-size: ${theme.size.h4}px;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
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

export default function AnalysisButton({
  onClick,
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}): JSX.Element {
  return (
    <Button onClick={onClick}>
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
        <RightArrow />
      </div>
      분석 시작
    </Button>
  );
}
