/* eslint-disable import/named */
import PropTypes from "prop-types";
import React from "react";
import styled, { StyledComponentProps } from "styled-components";

const Button = styled.button<{ color?: string }>`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${({ color }) => color};
  border: 2px solid ${({ color }) => color};
  &:active {
    transform: translateY(1px);
  }
`;

export const Buttontest: React.FC<StyledComponentProps<
  "button",
  never,
  { color?: string },
  never
>> = (props) => (
  <Button color={props.color} {...props}>
    {props.children}
  </Button>
);

Buttontest.defaultProps = {
  color: "black",
};

Buttontest.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
