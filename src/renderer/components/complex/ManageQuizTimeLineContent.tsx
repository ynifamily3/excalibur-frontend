import React from "react";
import color from "styles/color";
import styled from "styled-components";
import { RootState } from "rootReducer";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  padding: 44px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function ManageQuizTimeLineContent(): JSX.Element {
  return <Wrapper>퀴즈 타임라인</Wrapper>;
}
