import React from "react";
import theme from "styles/theme";
import styled from "styled-components";
import { RootState } from "rootReducer";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
`;

const TitleMessage = styled.h1`
  font-size: ${theme.size.h2}px;
`;

export default function Gnb(): JSX.Element {
  const { accountInfo } = useSelector((state: RootState) => state.account);

  return (
    <Wrapper>
      <TitleMessage>{accountInfo.name}님, 환영합니다! </TitleMessage>
    </Wrapper>
  );
}
