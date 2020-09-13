import styled from "styled-components";
import { ButtonProps } from "types/components/atoms/Button";

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  color: ${(props: ButtonProps) => props.color};
  border: 2px solid ${(props: ButtonProps) => props.color};
`;

export default Button;
