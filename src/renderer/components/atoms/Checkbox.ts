import styled from "styled-components";

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Checkbox = styled.input`
  &::after {
    width: 20px;
    height: 20px;
    position: relative;
    border: 2px solid black;
    background-color: white;
    content: "";
    display: inline-block;
    top: -3px;
    left: -1px;
    box-sizing: border-box;
  }
  &:checked::after {
    content: "◆";
    /* font-size: 13px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ALabel = styled.label`
  padding: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
