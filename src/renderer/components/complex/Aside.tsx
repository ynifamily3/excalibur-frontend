import React from "react";
import color from "styles/color";
import styled from "styled-components";
import { RootState } from "rootReducer";
import { useSelector } from "react-redux";
import Button from "components/atoms/Button";
import AnalysisButton from "components/atoms/AnlysisButton";

const Wrapper = styled.div`
  width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color.aside};
`;

export default function Aside(): JSX.Element {
  const { accountInfo } = useSelector((state: RootState) => state.account);

  return (
    <Wrapper>
      <div>{accountInfo.name}님, Aside입니다. </div>
      <AnalysisButton />
    </Wrapper>
  );
}
