import styled from "styled-components";
import theme from "styles/theme";

const InputText = styled.input`
  width: 100%;
  min-width: 300px;
  min-height: 44px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.05);
  font-size: ${theme.size.h4}px;
  padding-left: 10px;
  appearance: none;
`;

export default InputText;
