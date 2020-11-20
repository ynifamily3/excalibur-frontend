import styled from "styled-components";

export const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
`;
export const RadioSelect = styled.div`
  /* 라디오 셀렉트 패러렐하게 있을 때 첫번째 차일드  */
  display: flex;
  margin-right: 25px;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
export const Radio = styled.input`
  &::after {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    top: -2px;
    left: -1px;
    position: relative;
    border: 2px solid black;
    background-color: white;
    content: "";
    display: inline-block;
    box-sizing: border-box;
  }

  &:checked::after {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    position: relative;
    background-color: white;
    content: "●";
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: visible;
    border: 2px solid black;
    box-sizing: border-box;
  }
`;

export const RadioLabel = styled.label`
  padding-left: 10px;
  margin-top: -2px;
  margin-left: 1px;
`;
