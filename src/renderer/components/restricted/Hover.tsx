import styled from "styled-components";
import { HoverTypes } from "types/App";

const Hover = styled.div`
  position: fixed;
  top: ${(props: HoverTypes) => (props.top ? props.top : "0.7em")};
  right: ${(props: HoverTypes) => (props.right ? props.right : "0.7em")};
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  border-color: #dcddde;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: none;
  &:hover {
    background-color: #f6f6f7;
  }
  &:active {
    transform: translateY(1px);
  }
`;

export default Hover;
