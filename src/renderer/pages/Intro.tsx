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

export default function Intro(): JSX.Element {
  const history = useHistory();
  return (
    <Wrapper>
      <H1>Excalibur - 비대면 강의 집중력 향상 솔루션</H1>
      <Button
        onClick={() => {
          history.replace("/about");
        }}
        color="black"
        style={{
          marginTop: "20em",
          width: "10em",
          paddingTop: "1em",
          paddingBottom: "1em",
        }}
      >
        입장
      </Button>
    </Wrapper>
  );
}
