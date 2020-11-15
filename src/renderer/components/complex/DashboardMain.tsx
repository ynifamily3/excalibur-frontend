import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import theme from "styles/theme";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function DashboardMain(): JSX.Element {
  return (
    <Wrapper>
      <div style={{ fontSize: theme.size.h2, marginBottom: "44px" }}>
        Excalibur에 오신 것을 환영해요.
      </div>
    </Wrapper>
  );
}
