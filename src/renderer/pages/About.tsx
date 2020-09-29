import Button from "components/atoms/Button";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  margin-top: 7em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
`;

export default function About(): JSX.Element {
  const history = useHistory();
  return (
    <Wrapper>
      <Button
        className="animate__animated animate__bounce"
        onClick={() => {
          history.replace("/");
        }}
        color="red"
        style={{
          marginTop: "20em",
          width: "10em",
          paddingTop: "1em",
          paddingBottom: "1em",
        }}
      >
        로그아웃
      </Button>
    </Wrapper>
  );
}
