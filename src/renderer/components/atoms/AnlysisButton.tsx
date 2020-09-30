import React from "react";
import color from "styles/color";
import styled from "styled-components";
const Button = styled.button`
  background-color: ${color.green[1]};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
  border: none;
  color: ${color.gray[1]};
  height: 40px;
  &:active {
    transform: translateY(1px);
  }
`;

export default function AnalysisButton(): JSX.Element {
  return <Button>→ (to image) 분석 시작</Button>;
}
