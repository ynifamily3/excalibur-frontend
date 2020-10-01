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
  padding-left: 25px;
  border-bottom: 2px solid black;
`;

const TitleMessage = styled.h1`
  font-weight: normal;
  font-size: ${theme.size.h2}px;
  line-height: 41px;
  margin: 0;
`;

export default function Gnb(): JSX.Element {
  const { accountInfo } = useSelector((state: RootState) => state.account);

  return (
    <Wrapper>
      <TitleMessage>
        {accountInfo.name}{" "}
        {accountInfo.mode === "teacher" ? "강의자" : "수강생"}님, 환영합니다!{" "}
      </TitleMessage>
    </Wrapper>
  );
}
