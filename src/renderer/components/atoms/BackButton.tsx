import React from "react";
import styled from "styled-components";
import Back from "components/atoms/svg/Back";

const BackWrapper = styled.button`
  border: none;
  background-color: inherit;
  display: flex;
  width: 80px;
  height: 100%;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

interface IBackButton {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function BackButton(props: IBackButton): JSX.Element {
  return (
    <BackWrapper onClick={props.onClick}>
      <Back />
    </BackWrapper>
  );
}
