import React from "react";
import styled from "styled-components";
import Gnb from "components/complex/Gnb";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function SignUp(): JSX.Element {
  return (
    <Wrapper>
      <Gnb titleMessage="회원가입" backButton={{ to: "/" }} />
      이것은 회원가입 페이지 입니다.
    </Wrapper>
  );
}
