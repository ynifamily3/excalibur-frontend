import React from "react";
import theme from "styles/theme";
import styled from "styled-components";
import { RootState } from "rootReducer";
import { useSelector } from "react-redux";
import BackButton from "components/atoms/BackButton";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid black;
`;

const TitleMessage = styled.h1`
  font-weight: normal;
  font-size: ${theme.size.h2}px;
  line-height: 41px;
  margin: 0;
`;

interface IGnbProps {
  titleMessage?: string;
  backButton?: {
    to: string;
  };
}

export default function Gnb(props: IGnbProps): JSX.Element {
  const { accountInfo } = useSelector((state: RootState) => state.account);
  const { titleMessage, backButton } = props;
  const _history = useHistory();
  return (
    <Wrapper>
      {backButton ? (
        <BackButton
          onClick={() => {
            _history.replace(backButton.to);
          }}
        />
      ) : (
        <div style={{ paddingLeft: 25 }} />
      )}

      <TitleMessage>
        {titleMessage
          ? titleMessage
          : accountInfo.name +
            " " +
            (accountInfo.mode === "teacher" ? "강의자" : "수강생") +
            "님, 환영합니다!"}
      </TitleMessage>
      {/* </div> */}
    </Wrapper>
  );
}
